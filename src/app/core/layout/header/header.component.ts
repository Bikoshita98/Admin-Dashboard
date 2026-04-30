import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  themeService = inject(ThemeService);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
