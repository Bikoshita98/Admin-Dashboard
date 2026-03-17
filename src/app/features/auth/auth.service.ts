import { Injectable } from "@angular/core";
import { of, delay } from "rxjs";
import { User } from "../../core/models/user.model";


@Injectable({    providedIn: 'root' })
export class AuthService {
    login(email: string, password: string) {
        // Simulate an API call with a delay
        const mockUser: User = {
            id: '1',
            name: 'John Doe',
            email: email,
            role: email.includes('admin') ? 'ADMIN' : 'MANAGER',
            token: 'fake-jwt-token'
        };

        return of(mockUser).pipe(delay(1000));
    }
}