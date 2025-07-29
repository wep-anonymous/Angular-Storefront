import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Login</h1>
        
        <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              [(ngModel)]="credentials.email"
              required
              email
              class="form-control"
              placeholder="Enter your email">
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              [(ngModel)]="credentials.password"
              required
              minlength="6"
              class="form-control"
              placeholder="Enter your password">
          </div>
          
          @if (error) {
            <div class="error-message">
              {{ error }}
            </div>
          }
          
          <button 
            type="submit" 
            [disabled]="!loginForm.valid || loading"
            class="login-btn">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        
        <div class="register-link">
          Don't have an account? 
          <a routerLink="/register">Register here</a>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .login-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      margin: 0 0 2rem 0;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
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

    .error-message {
      background-color: #fee;
      color: #c33;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      text-align: center;
    }

    .login-btn {
      width: 100%;
      padding: 1rem;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .login-btn:hover:not(:disabled) {
      background-color: #555;
    }

    .login-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .register-link {
      text-align: center;
      margin-top: 1.5rem;
      color: #666;
    }

    .register-link a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    credentials = {
        email: '',
        password: ''
    };

    loading = false;
    error = '';

    onSubmit(): void {
        this.loading = true;
        this.error = '';

        this.authService.login(this.credentials.email, this.credentials.password).subscribe({
            next: (user) => {
                // Get return URL from query params or default to home
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
            },
            error: (error) => {
                this.error = 'Invalid email or password';
                this.loading = false;
            }
        });
    }
}