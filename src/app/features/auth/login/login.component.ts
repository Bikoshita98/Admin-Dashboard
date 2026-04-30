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

  onLogin() {
    this.authService.login(this.email, this.password).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      authStore.set(user);
      this.router.navigate(['/dashboard']);
    });
  }
}
