import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  toasts = this._toasts.asReadonly();

  private nextId = 0;

  success(message: string) {
    this.add(message, 'success');
  }

  error(message: string) {
    this.add(message, 'error');
  }

  warning(message: string) {
    this.add(message, 'warning');
  }

  info(message: string) {
    this.add(message, 'info');
  }

  dismiss(id: number) {
    this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  private add(message: string, type: ToastType, duration = 4000) {
    const id = this.nextId++;
    this._toasts.update((toasts) => [...toasts, { id, message, type }]);
    setTimeout(() => this.dismiss(id), duration);
  }
}
