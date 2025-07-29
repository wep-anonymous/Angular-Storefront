import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
    id: string;
    email: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Using Angular's new signal for reactive state
    private currentUser = signal<User | null>(null);

    // Expose as readonly signal
    readonly user = this.currentUser.asReadonly();

    constructor() {
        // Check localStorage for existing user session
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser.set(JSON.parse(savedUser));
        }
    }

    login(email: string, password: string): Observable<User> {
        // Simulate API call - in real app, this would call your backend
        const mockUser: User = {
            id: '1',
            email: email,
            name: 'John Doe'
        };

        this.currentUser.set(mockUser);
        localStorage.setItem('currentUser', JSON.stringify(mockUser));

        return of(mockUser);
    }

    logout(): void {
        this.currentUser.set(null);
        localStorage.removeItem('currentUser');
    }

    isAuthenticated(): boolean {
        return !!this.currentUser();
    }

    register(email: string, password: string, name: string): Observable<User> {
        // Simulate API call
        const newUser: User = {
            id: Date.now().toString(),
            email: email,
            name: name
        };

        this.currentUser.set(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return of(newUser);
    }
}