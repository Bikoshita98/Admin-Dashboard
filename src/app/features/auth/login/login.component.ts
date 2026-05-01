import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { authStore } from '../auth.store';

@Component({
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  onLogin() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      authStore.set(user);
      this.router.navigate(['/dashboard']);
    });

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        authStore.set(user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
