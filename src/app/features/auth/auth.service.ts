import { Injectable } from '@angular/core';
import { of, delay, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../core/models/user.model';
import { authStore } from './auth.store';

const MOCK_USERS: { email: string; password: string; user: User }[] = [
  {
    email: 'admin@ep.com',
    password: 'admin123',
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@ep.com',
      role: 'ADMIN',
      token: 'fake-admin-token',
    },
  },
  {
    email: 'manager@ep.com',
    password: 'manager123',
    user: {
      id: '2',
      name: 'Manager User',
      email: 'manager@ep.com',
      role: 'MANAGER',
      token: 'fake-manager-token',
    },
  },
];
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  login(email: string, password: string) {
    // TODO: replace with this.http.post(`${this.apiUrl}/auth/login`, { email, password })
    const match = MOCK_USERS.find((u) => u.email === email && u.password === password);

    if (!match) {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(1000));
    }

    return of(match.user).pipe(delay(1000));
  }

  logout() {
    localStorage.removeItem('user');
    authStore.clear();
  }
}
