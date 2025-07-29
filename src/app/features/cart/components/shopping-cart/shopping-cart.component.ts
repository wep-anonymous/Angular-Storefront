import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../core/services/cart.service';

@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    template: `
    <div class="cart-container">
      <h1>Shopping Cart</h1>
      
      @if (cartService.items().length === 0) {
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <a routerLink="/products" class="continue-shopping">Continue Shopping</a>
        </div>
      } @else {
        <div class="cart-content">
          <div class="cart-items">
            @for (item of cartService.items(); track item.productId) {
              <div class="cart-item">
                <img [src]="item.imageUrl" [alt]="item.name" class="item-image">
                
                <div class="item-details">
                  <h3>{{ item.name }}</h3>
                  <p class="item-price">{{ item.price | currency }}</p>
                </div>
                
                <div class="quantity-controls">
                  <button (click)="decreaseQuantity(item)" class="quantity-btn">-</button>
                  <input 
                    type="number" 
                    [(ngModel)]="item.quantity"
                    (change)="updateQuantity(item)"
                    min="1"
                    class="quantity-input">
                  <button (click)="increaseQuantity(item)" class="quantity-btn">+</button>
                </div>
                
                <div class="item-total">
                  {{ (item.price * item.quantity) | currency }}
                </div>
                
                <button (click)="removeItem(item.productId)" class="remove-btn">
                  Remove
                </button>
              </div>
            }
          </div>
          
          <div class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-line">
              <span>Items ({{ cartService.itemCount() }})</span>
              <span>{{ cartService.totalPrice() | currency }}</span>
            </div>
            <div class="summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr>
            <div class="summary-total">
              <span>Total</span>
              <span>{{ cartService.totalPrice() | currency }}</span>
            </div>
            
            <a routerLink="/checkout" class="checkout-btn">
              Proceed to Checkout
            </a>
          </div>
        </div>
      }
    </div>
  `,
    styles: [`
    .cart-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      margin-bottom: 2rem;
      color: #333;
    }

    .empty-cart {
      text-align: center;
      padding: 3rem;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .empty-cart p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 1.5rem;
    }

    .continue-shopping {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #333;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    .cart-items {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .cart-item {
      display: grid;
      grid-template-columns: 80px 1fr auto auto auto;
      gap: 1rem;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }

    .item-price {
      color: #666;
      margin: 0;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .quantity-btn {
      width: 30px;
      height: 30px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .quantity-input {
      width: 50px;
      padding: 0.25rem;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .item-total {
      font-weight: bold;
      font-size: 1.1rem;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #e74c3c;
      cursor: pointer;
      text-decoration: underline;
    }

    .cart-summary {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .cart-summary h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.3rem;
    }

    .summary-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: #666;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
      font-weight: bold;
      margin: 1rem 0 1.5rem 0;
    }

    .checkout-btn {
      display: block;
      width: 100%;
      padding: 1rem;
      background-color: #27ae60;
      color: white;
      text-align: center;
      text-decoration: none;
      border-radius: 4px;
      font-size: 1.1rem;
    }

    .checkout-btn:hover {
      background-color: #219a52;
    }

    hr {
      border: none;
      border-top: 1px solid #eee;
      margin: 1rem 0;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-item {
        grid-template-columns: 60px 1fr;
        gap: 0.5rem;
      }

      .quantity-controls,
      .item-total,
      .remove-btn {
        grid-column: 2;
      }
    }
  `]
})
export class ShoppingCartComponent {
    cartService = inject(CartService);

    updateQuantity(item: any): void {
        this.cartService.updateQuantity(item.productId, item.quantity);
    }

    increaseQuantity(item: any): void {
        this.cartService.updateQuantity(item.productId, item.quantity + 1);
    }

    decreaseQuantity(item: any): void {
        if (item.quantity > 1) {
            this.cartService.updateQuantity(item.productId, item.quantity - 1);
        }
    }

    removeItem(productId: string): void {
        this.cartService.removeFromCart(productId);
    }
}