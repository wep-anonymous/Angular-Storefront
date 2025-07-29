import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="product-card">
      <a [routerLink]="['/products', product.id]" class="product-link">
        <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price | currency }}</p>
        </div>
      </a>
      <button (click)="addToCart.emit(product)" class="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  `,
    styles: [`
    .product-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .product-link {
      text-decoration: none;
      color: inherit;
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .product-info {
      padding: 1rem;
    }

    .product-name {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      color: #333;
    }

    .product-price {
      margin: 0;
      font-size: 1.25rem;
      font-weight: bold;
      color: #27ae60;
    }

    .add-to-cart-btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #333;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;
    }

    .add-to-cart-btn:hover {
      background-color: #555;
    }
  `]
})
export class ProductCardComponent {
    @Input() product: any;
    @Output() addToCart = new EventEmitter<any>();
}