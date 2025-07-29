import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        CommonModule,
        ProductCardComponent,
        LoadingSpinnerComponent,
        ProductFilterComponent
    ],
    template: `
    <div class="product-list-container">
      <h1>Our Products</h1>
      
      <app-product-filter 
        [categories]="categories"
        (filterChange)="onFilterChange($event)"
        (searchChange)="onSearchChange($event)">
      </app-product-filter>

      @if (loading) {
        <app-loading-spinner></app-loading-spinner>
      } @else if (filteredProducts.length === 0) {
        <p class="no-products">No products found.</p>
      } @else {
        <div class="product-grid">
          @for (product of filteredProducts; track product.id) {
            <app-product-card 
              [product]="product"
              (addToCart)="addToCart($event)">
            </app-product-card>
          }
        </div>
      }
    </div>
  `,
    styles: [`
    .product-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .no-products {
      text-align: center;
      padding: 3rem;
      color: #666;
      font-size: 1.1rem;
    }
  `]
})
export class ProductListComponent implements OnInit {
    private productService = inject(ProductService);
    private cartService = inject(CartService);

    products: Product[] = [];
    filteredProducts: Product[] = [];
    categories: string[] = [];
    loading = true;

    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories();
    }

    loadProducts(): void {
        this.loading = true;
        this.productService.getProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.filteredProducts = products;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading products:', error);
                this.loading = false;
            }
        });
    }

    loadCategories(): void {
        this.productService.getCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
            }
        });
    }

    onFilterChange(category: string): void {
        if (category === 'all') {
            this.filteredProducts = this.products;
        } else {
            this.filteredProducts = this.products.filter(p => p.category === category);
        }
    }

    onSearchChange(searchTerm: string): void {
        if (!searchTerm.trim()) {
            this.filteredProducts = this.products;
        } else {
            this.filteredProducts = this.products.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product);
        // You could add a toast notification here
        alert(`${product.name} added to cart!`);
    }
}