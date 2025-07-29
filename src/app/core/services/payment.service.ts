import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';

// Declare Stripe types (since we're manually injecting)
declare const Stripe: any;

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private stripe: any;

    constructor() {
        // We'll initialize Stripe when the service is first used
    }

    initializeStripe(publishableKey: string): void {
        if (typeof Stripe !== 'undefined') {
            this.stripe = Stripe(publishableKey);
        } else {
            console.error('Stripe.js has not loaded yet.');
        }
    }

    createPaymentIntent(amount: number): Observable<any> {
        // In a real app, this would call your backend
        // Backend would use Stripe's secret key to create payment intent
        return from(
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount })
            }).then(res => res.json())
        );
    }

    async confirmPayment(clientSecret: string, paymentElement: any): Promise<any> {
        if (!this.stripe) {
            throw new Error('Stripe not initialized');
        }

        const { error, paymentIntent } = await this.stripe.confirmPayment({
            elements: paymentElement,
            confirmParams: {
                return_url: window.location.origin + '/payment-success',
            },
            redirect: 'if_required'
        });

        if (error) {
            throw error;
        }

        return paymentIntent;
    }
}