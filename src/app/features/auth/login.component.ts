import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { authStore } from './auth.store';

@Component({
    standalone: true,
    imports: [FormsModule],
    template: `
    <h2>Login</h2>
    <form (ngSubmit)="onLogin()">
        <input [(ngModel)]="email" name="email" placeholder="Email" />
        <input [(ngModel)]="password" name="password" type="password" placeholder="Password"    />
        <button type="submit">Login</button> 
    </form>
    `
})

export class LoginComponent {
      email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password)
    .subscribe(user => {
        localStorage.setItem('token', user.token);
        authStore.setUser(user);
        this.router.navigate(['/dashboard']);
    })
  }
}