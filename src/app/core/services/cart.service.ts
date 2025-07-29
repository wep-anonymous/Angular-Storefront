import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    // Using signals for reactive cart state
    private cartItems = signal<CartItem[]>([]);

    // Computed signals for derived state
    readonly items = this.cartItems.asReadonly();
    readonly itemCount = computed(() =>
        this.cartItems().reduce((total, item) => total + item.quantity, 0)
    );
    readonly totalPrice = computed(() =>
        this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
    );

    constructor() {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cartItems.set(JSON.parse(savedCart));
        }
    }

    addToCart(product: any): void {
        const currentItems = this.cartItems();
        const existingItem = currentItems.find(item => item.productId === product.id);

        if (existingItem) {
            // Update quantity if item exists
            this.cartItems.update(items =>
                items.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            // Add new item
            const newItem: CartItem = {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                imageUrl: product.imageUrl
            };
            this.cartItems.update(items => [...items, newItem]);
        }

        this.saveCart();
    }

    removeFromCart(productId: string): void {
        this.cartItems.update(items =>
            items.filter(item => item.productId !== productId)
        );
        this.saveCart();
    }

    updateQuantity(productId: string, quantity: number): void {
        if (quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.cartItems.update(items =>
                items.map(item =>
                    item.productId === productId
                        ? { ...item, quantity }
                        : item
                )
            );
            this.saveCart();
        }
    }

    clearCart(): void {
        this.cartItems.set([]);
        this.saveCart();
    }

    private saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }
}