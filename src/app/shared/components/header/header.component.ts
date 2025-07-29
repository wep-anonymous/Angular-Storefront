import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <header class="header">
      <nav class="navbar">
        <div class="navbar-brand">
          <a routerLink="/" class="logo">Angular Store</a>
        </div>
        
        <div class="navbar-menu">
          <a routerLink="/products" class="nav-link">Products</a>
          
          @if (authService.user()) {
            <a routerLink="/profile" class="nav-link">
              {{ authService.user()?.name }}
            </a>
            <button (click)="logout()" class="nav-link btn-link">
              Logout
            </button>
          } @else {
            <a routerLink="/login" class="nav-link">Login</a>
          }
          
          <a routerLink="/cart" class="nav-link cart-link">
            Cart
            @if (cartService.itemCount() > 0) {
              <span class="badge">{{ cartService.itemCount() }}</span>
            }
          </a>
        </div>
      </nav>
    </header>
  `,
    styles: [`
    .header {
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      text-decoration: none;
    }

    .navbar-menu {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .nav-link {
      color: #666;
      text-decoration: none;
      transition: color 0.3s;
    }

    .nav-link:hover {
      color: #333;
    }

    .btn-link {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .cart-link {
      position: relative;
    }

    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: #ff4136;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
    }
  `]
})
export class HeaderComponent {
    authService = inject(AuthService);
    cartService = inject(CartService);

    logout(): void {
        this.authService.logout();
    }
}