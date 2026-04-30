import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../core/models/user.model';
import { authStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  login(email: string, _password: string) {
    // TODO: replace with this.http.post(`${this.apiUrl}/auth/login`, { email, password })
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      role: email.includes('admin') ? 'ADMIN' : 'MANAGER',
      token: 'fake-jwt-token',
    };

    return of(mockUser).pipe(delay(1000));
  }

  logout() {
    localStorage.removeItem('user');
    authStore.clear();
  }
}
