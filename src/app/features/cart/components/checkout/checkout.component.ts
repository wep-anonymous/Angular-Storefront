import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { PaymentService } from '../../../../core/services/payment.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="checkout-container">
      <h1>Checkout</h1>
      
      <div class="checkout-content">
        <div class="checkout-form">
          <section class="form-section">
            <h2>Billing Information</h2>
            <form #checkoutForm="ngForm">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    [(ngModel)]="billingInfo.firstName"
                    required
                    class="form-control">
                </div>
                
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    [(ngModel)]="billingInfo.lastName"
                    required
                    class="form-control">
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  [(ngModel)]="billingInfo.email"
                  required
                  class="form-control">
              </div>
              
              <div class="form-group">
                <label for="address">Address</label>
                <input 
                  type="text" 
                  id="address"
                  name="address"
                  [(ngModel)]="billingInfo.address"
                  required
                  class="form-control">
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="city">City</label>
                  <input 
                    type="text" 
                    id="city"
                    name="city"
                    [(ngModel)]="billingInfo.city"
                    required
                    class="form-control">
                </div>
                
                <div class="form-group">
                  <label for="zipCode">ZIP Code</label>
                  <input 
                    type="text" 
                    id="zipCode"
                    name="zipCode"
                    [(ngModel)]="billingInfo.zipCode"
                    required
                    class="form-control">
                </div>
              </div>
            </form>
          </section>
          
          <section class="form-section">
            <h2>Payment Method</h2>
            <div class="payment-method">
              <p>Credit/Debit Card</p>
              <div id="payment-element"></div>
            </div>
          </section>
        </div>
        
        <div class="order-summary">
          <h2>Order Summary</h2>
          
          <div class="order-items">
            @for (item of cartService.items(); track item.productId) {
              <div class="order-item">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span>{{ (item.price * item.quantity) | currency }}</span>
              </div>
            }
          </div>
          
          <hr>
          
          <div class="summary-line">
            <span>Subtotal</span>
            <span>{{ cartService.totalPrice() | currency }}</span>
          </div>
          
          <div class="summary-line">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div class="summary-line">
            <span>Tax</span>
            <span>{{ tax | currency }}</span>
          </div>
          
          <hr>
          
          <div class="total-line">
            <span>Total</span>
            <span>{{ totalWithTax | currency }}</span>
          </div>
          
          <button 
            (click)="processPayment()"
            [disabled]="!checkoutForm.valid || processing"
            class="place-order-btn">
            {{ processing ? 'Processing...' : 'Place Order' }}
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .checkout-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      margin-bottom: 2rem;
      color: #333;
    }

    .checkout-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 2rem;
    }

    .checkout-form {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.3rem;
      color: #333;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-control:focus {
      outline: none;
      border-color: #333;
    }

    .payment-method {
      background: #f9f9f9;
      padding: 1rem;
      border-radius: 4px;
    }

    .payment-method p {
      margin: 0 0 1rem 0;
      font-weight: 500;
    }

    #payment-element {
      min-height: 200px;
      padding: 1rem;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .order-summary {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .order-summary h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.3rem;
    }

    .order-items {
      margin-bottom: 1rem;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      color: #666;
    }

    .summary-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      color: #666;
    }

    .total-line {
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
      font-weight: bold;
      margin: 1rem 0 1.5rem 0;
    }

    .place-order-btn {
      width: 100%;
      padding: 1rem;
      background-color: #27ae60;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1.1rem;
      cursor: pointer;
    }

    .place-order-btn:hover:not(:disabled) {
      background-color: #219a52;
    }

    .place-order-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    hr {
      border: none;
      border-top: 1px solid #eee;
      margin: 1rem 0;
    }

    @media (max-width: 768px) {
      .checkout-content {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
    cartService = inject(CartService);
    authService = inject(AuthService);
    paymentService = inject(PaymentService);
    router = inject(Router);

    billingInfo = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: ''
    };

    processing = false;

    get tax(): number {
        return this.cartService.totalPrice() * 0.08; // 8% tax
    }

    get totalWithTax(): number {
        return this.cartService.totalPrice() + this.tax;
    }

    ngOnInit(): void {
        // Initialize Stripe
        this.loadStripe();

        // Pre-fill email if user is logged in
        const user = this.authService.user();
        if (user) {
            this.billingInfo.email = user.email;
        }
    }

    loadStripe(): void {
        // Add Stripe script to the page
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => {
            // Initialize Stripe with your publishable key
            this.paymentService.initializeStripe('your_stripe_publishable_key_here');
        };
        document.body.appendChild(script);
    }

    async processPayment(): Promise<void> {
        this.processing = true;

        try {
            // In a real app, you would:
            // 1. Create payment intent on your backend
            // 2. Confirm payment with Stripe
            // 3. Save order to database

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear cart
            this.cartService.clearCart();

            // Navigate to success page
            this.router.navigate(['/order-success']);
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            this.processing = false;
        }
    }
}