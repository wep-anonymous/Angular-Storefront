import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, LoadingSpinnerComponent],
    template: `
    <div class="product-detail-container">
      @if (loading) {
        <app-loading-spinner></app-loading-spinner>
      } @else if (product) {
        <div class="product-detail">
          <div class="product-image-section">
            <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
          </div>
          
          <div class="product-info-section">
            <h1>{{ product.name }}</h1>
            <p class="price">{{ product.price | currency }}</p>
            
            <div class="stock-status" [class.in-stock]="product.inStock">
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </div>
            
            <p class="description">{{ product.description }}</p>
            
            <div class="category">
              <strong>Category:</strong> {{ product.category }}
            </div>
            
            <div class="actions">
              <button 
                (click)="addToCart()" 
                [disabled]="!product.inStock"
                class="add-to-cart-btn">
                Add to Cart
              </button>
              
              <button (click)="goBack()" class="back-btn">
                Back to Products
              </button>
            </div>
          </div>
        </div>
      } @else {
        <p class="not-found">Product not found.</p>
      }
    </div>
  `,
    styles: [`
    .product-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      background: #fff;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .product-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: 8px;
    }

    .product-info-section h1 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .price {
      font-size: 2rem;
      font-weight: bold;
      color: #27ae60;
      margin: 0 0 1rem 0;
    }

    .stock-status {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      background-color: #e74c3c;
      color: white;
      margin-bottom: 1.5rem;
    }

    .stock-status.in-stock {
      background-color: #27ae60;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
      margin-bottom: 1.5rem;
    }

    .category {
      margin-bottom: 2rem;
      color: #666;
    }

    .actions {
      display: flex;
      gap: 1rem;
    }

    .add-to-cart-btn, .back-btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .add-to-cart-btn {
      background-color: #333;
      color: white;
      flex: 1;
    }

    .add-to-cart-btn:hover:not(:disabled) {
      background-color: #555;
    }

    .add-to-cart-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .back-btn {
      background-color: #f0f0f0;
      color: #333;
    }

    .back-btn:hover {
      background-color: #e0e0e0;
    }

    .not-found {
      text-align: center;
      padding: 3rem;
      color: #666;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .product-detail {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private productService = inject(ProductService);
    private cartService = inject(CartService);

    product: Product | undefined;
    loading = true;

    ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        if (productId) {
            this.loadProduct(productId);
        }
    }

    loadProduct(id: string): void {
        this.loading = true;
        this.productService.getProduct(id).subscribe({
            next: (product) => {
                this.product = product;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading product:', error);
                this.loading = false;
            }
        });
    }

    addToCart(): void {
        if (this.product) {
            this.cartService.addToCart(this.product);
            alert(`${this.product.name} added to cart!`);
        }
    }

    goBack(): void {
        this.router.navigate(['/products']);
    }
}