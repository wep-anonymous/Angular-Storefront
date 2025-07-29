import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-order-success',
    standalone: true,
    imports: [RouterModule],
    template: `
    <div class="success-container">
      <div class="success-card">
        <div class="checkmark">✓</div>
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase. Your order has been received and is being processed.</p>
        <p class="order-number">Order #{{ orderNumber }}</p>
        <a routerLink="/products" class="continue-btn">Continue Shopping</a>
      </div>
    </div>
  `,
    styles: [`
    .success-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .success-card {
      background: white;
      border-radius: 8px;
      padding: 3rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }

    .checkmark {
      width: 80px;
      height: 80px;
      background-color: #27ae60;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      margin: 0 auto 2rem;
    }

    h1 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    p {
      color: #666;
      margin-bottom: 1rem;
    }

    .order-number {
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
      margin: 2rem 0;
    }

    .continue-btn {
      display: inline-block;
      padding: 1rem 2rem;
      background-color: #333;
      color: white;
      border-radius: 4px;
      text-decoration: none;
    }

    .continue-btn:hover {
      background-color: #555;
    }
  `]
})
export class OrderSuccessComponent {
    orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}