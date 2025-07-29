import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        loadComponent: () => import('./features/products/components/product-list/product-list.component')
            .then(m => m.ProductListComponent)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./features/products/components/product-detail/product-detail.component')
            .then(m => m.ProductDetailComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/components/shopping-cart/shopping-cart.component')
            .then(m => m.ShoppingCartComponent)
    },
    {
        path: 'checkout',
        loadComponent: () => import('./features/cart/components/checkout/checkout.component')
            .then(m => m.CheckoutComponent),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/user/components/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/user/components/register/register.component')
            .then(m => m.RegisterComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/user/components/profile/profile.component')
            .then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'order-success',
        loadComponent: () => import('./features/cart/components/order-success/order-success.component')
            .then(m => m.OrderSuccessComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '/products'
    }
];