import { signal, computed } from '@angular/core';
import { User } from '../../core/models/user.model';

class AuthStore {
  private _user = signal<User | null>(null);

  user = computed(() => this._user());
  isAuthenticated = computed(() => !!this._user());
  role = computed(() => this._user()?.role);

  init() {
    const stored = localStorage.getItem('user');
    if (stored) this._user.set(JSON.parse(stored));
  }

  set(user: User) {
    this._user.set(user);
  }

  clear() {
    this._user.set(null);
  }
}

export const authStore = new AuthStore();
