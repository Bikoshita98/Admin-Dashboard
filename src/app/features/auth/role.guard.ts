import { CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { authStore } from './auth.store';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];

  if (!expectedRoles.includes(authStore.role()!)) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};