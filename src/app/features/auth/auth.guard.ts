import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { authStore } from './auth.store';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn = authStore.isAuthenticated();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};