import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    inStock: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // Mock data - in real app, this would come from an API
    private mockProducts: Product[] = [
        {
            id: '1',
            name: 'Laptop Pro',
            price: 1299.99,
            description: 'High-performance laptop for professionals',
            imageUrl: 'https://via.placeholder.com/300x200',
            category: 'Electronics',
            inStock: true
        },
        {
            id: '2',
            name: 'Wireless Headphones',
            price: 199.99,
            description: 'Premium noise-cancelling headphones',
            imageUrl: 'https://via.placeholder.com/300x200',
            category: 'Electronics',
            inStock: true
        },
        {
            id: '3',
            name: 'Smart Watch',
            price: 349.99,
            description: 'Feature-rich smartwatch with health tracking',
            imageUrl: 'https://via.placeholder.com/300x200',
            category: 'Electronics',
            inStock: true
        },
        {
            id: '4',
            name: 'Coffee Maker',
            price: 89.99,
            description: 'Automatic coffee maker with timer',
            imageUrl: 'https://via.placeholder.com/300x200',
            category: 'Home',
            inStock: true
        }
    ];

    getProducts(): Observable<Product[]> {
        // Simulate API delay
        return of(this.mockProducts).pipe(delay(500));
    }

    getProduct(id: string): Observable<Product | undefined> {
        const product = this.mockProducts.find(p => p.id === id);
        return of(product).pipe(delay(300));
    }

    getCategories(): Observable<string[]> {
        const categories = [...new Set(this.mockProducts.map(p => p.category))];
        return of(categories);
    }

    getProductsByCategory(category: string): Observable<Product[]> {
        const filtered = this.mockProducts.filter(p => p.category === category);
        return of(filtered).pipe(delay(300));
    }

    searchProducts(searchTerm: string): Observable<Product[]> {
        const filtered = this.mockProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return of(filtered).pipe(delay(300));
    }
}