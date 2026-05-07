import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { authStore } from '../auth.store';

@Component({
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  onLogin() {
    this.errorMessage.set('');

    if (!this.email() || !this.password) {
      this.errorMessage.set('Email and password are required.');
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.email(), this.password).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        authStore.set(user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage.set('Login failed. Please check your credentials.');
        console.error('Login error:', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
