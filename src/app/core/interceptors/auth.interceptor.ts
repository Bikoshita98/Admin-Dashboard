import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { authStore } from '../../features/auth/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  const user = authStore.user();

  const authReq = user?.token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authStore.clear();
        localStorage.removeItem('user');
        toast.error('Session expired. Please log in again.');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
