import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    template: `
    <div class="register-container">
      <div class="register-card">
        <h1>Create Account</h1>
        
        <form #registerForm="ngForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              [(ngModel)]="user.name"
              required
              class="form-control"
              placeholder="Enter your full name">
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              [(ngModel)]="user.email"
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
              [(ngModel)]="user.password"
              required
              minlength="6"
              class="form-control"
              placeholder="Enter your password (min 6 characters)">
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword"
              [(ngModel)]="user.confirmPassword"
              required
              class="form-control"
              placeholder="Confirm your password">
          </div>
          
          @if (error) {
            <div class="error-message">
              {{ error }}
            </div>
          }
          
          <button 
            type="submit" 
            [disabled]="!registerForm.valid || loading"
            class="register-btn">
            {{ loading ? 'Creating Account...' : 'Register' }}
          </button>
        </form>
        
        <div class="login-link">
          Already have an account? 
          <a routerLink="/login">Login here</a>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .register-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .register-card {
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

    .register-btn {
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

    .register-btn:hover:not(:disabled) {
      background-color: #555;
    }

    .register-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .login-link {
      text-align: center;
      margin-top: 1.5rem;
      color: #666;
    }

    .login-link a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    loading = false;
    error = '';

    onSubmit(): void {
        // Validate passwords match
        if (this.user.password !== this.user.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.register(
            this.user.email,
            this.user.password,
            this.user.name
        ).subscribe({
            next: (user) => {
                this.router.navigate(['/']);
            },
            error: (error) => {
                this.error = 'Registration failed. Please try again.';
                this.loading = false;
            }
        });
    }
}