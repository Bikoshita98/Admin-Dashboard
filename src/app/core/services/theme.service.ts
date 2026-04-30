import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<Theme>(this.getStoredTheme());

  theme = this._theme.asReadonly();
  isDark = computed(() => this._theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this._theme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  toggle() {
    this._theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
