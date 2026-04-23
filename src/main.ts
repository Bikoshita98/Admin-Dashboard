import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { authStore } from './app/features/auth/auth.store';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

provideHttpClient(withInterceptors([authInterceptor]));

authStore.init();

