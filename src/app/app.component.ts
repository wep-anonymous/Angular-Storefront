import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';          // import RouterModule, not RouterOutlet
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,                                      // basic directives & pipes
        RouterModule,                                      // provides <router-outlet> & routerLink
        HeaderComponent,
        FooterComponent
    ],
    template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
    styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      background-color: #f8f9fa;
    }
  `]
})
export class AppComponent {
    title = 'angular-storefront';
}
