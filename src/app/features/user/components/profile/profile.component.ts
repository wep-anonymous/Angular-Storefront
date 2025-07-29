import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="profile-container">
      <div class="profile-card">
        <h1>My Profile</h1>
        
        @if (authService.user(); as user) {
          <div class="profile-info">
            <div class="info-item">
              <label>Name:</label>
              <p>{{ user.name }}</p>
            </div>
            
            <div class="info-item">
              <label>Email:</label>
              <p>{{ user.email }}</p>
            </div>
            
            <div class="info-item">
              <label>Member ID:</label>
              <p>{{ user.id }}</p>
            </div>
          </div>
          
          <div class="profile-actions">
            <button (click)="logout()" class="logout-btn">
              Logout
            </button>
          </div>
        }
      </div>
      
      <div class="order-history">
        <h2>Order History</h2>
        <p>No orders yet. Start shopping!</p>
      </div>
    </div>
  `,
    styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .profile-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    h1 {
      margin: 0 0 2rem 0;
      color: #333;
    }

    .profile-info {
      margin-bottom: 2rem;
    }

    .info-item {
      margin-bottom: 1.5rem;
    }

    .info-item label {
      display: block;
      color: #666;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .info-item p {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .profile-actions {
      text-align: center;
    }

    .logout-btn {
      padding: 0.75rem 2rem;
      background-color: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }

    .logout-btn:hover {
      background-color: #c0392b;
    }

    .order-history {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .order-history h2 {
      margin: 0 0 1.5rem 0;
      color: #333;
    }

    .order-history p {
      color: #666;
      text-align: center;
      padding: 2rem;
    }
  `]
})
export class ProfileComponent {
    authService = inject(AuthService);
    private router = inject(Router);

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}