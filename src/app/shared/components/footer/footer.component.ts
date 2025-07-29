import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 Angular Store. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      background-color: #333;
      color: #fff;
      padding: 2rem 0;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      text-align: center;
    }

    .footer-links {
      margin-top: 1rem;
      display: flex;
      gap: 2rem;
      justify-content: center;
    }

    .footer-links a {
      color: #ccc;
      text-decoration: none;
    }

    .footer-links a:hover {
      color: #fff;
    }
  `]
})
export class FooterComponent { }