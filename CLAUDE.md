# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at localhost:4200
npm run build      # production build
npm test           # unit tests (Karma + Jasmine)
npm run watch      # build in watch mode (development)

ng generate component features/<name>/<name> --standalone   # new feature component
ng generate service core/services/<name>                    # new core service
```

## Architecture

Angular 21 standalone-components application. No NgModules anywhere. `standalone: true` is no longer written explicitly — it is the default since Angular 19 and the migration removed it from all components.

### Folder convention

```
src/app/
  core/         # Singleton infrastructure: interceptors, layout shell, models, guards
  features/     # One folder per route domain (auth, dashboard, users, …)
  shared/       # Reusable dumb components, directives, pipes used by ≥2 features
```

`core/` is for things that exist once (interceptors, the layout shell, base models). `shared/` is for UI building blocks with no business logic. Feature-specific state, services, and guards live inside `features/<name>/` — not in `core/` or `shared/`.

### Bootstrap / providers — known issue

`provideHttpClient` and `authStore.init()` are currently called in `main.ts` **outside** `bootstrapApplication()`, which means the HTTP client is never actually registered. Both calls must move into `appConfig.providers` in `app.config.ts` before HTTP requests will work.

### State management

No NgRx. State is managed with Angular Signals using a hand-rolled store class pattern:

```ts
class SomeStore {
  private _data = signal<T | null>(null);
  data = computed(() => this._data());          // public read-only
  // mutation methods set() the private signal
}
export const someStore = new SomeStore();       // singleton exported directly
```

`authStore` (`features/auth/auth.store.ts`) is the only store currently implemented. All future feature stores (users, analytics, etc.) should follow the same class pattern and be exported as a singleton instance.

### Routing

All feature components are lazy-loaded via `loadComponent`. Protected routes are nested under the `AppLayoutComponent` shell, which is guarded by `authGuard`. Role-restricted routes additionally use `roleGuard` with `data: { roles: ['ADMIN'] }`.

Route shape:
```
/login                      → public, lazy LoginComponent
/                           → AppLayoutComponent (authGuard)
  /dashboard                → lazy DashboardComponent
  /users                    → lazy UsersComponent (roleGuard, ADMIN only)
```

### Auth flow

1. `LoginComponent` calls `AuthService.login()` (currently mocked with `of(...).pipe(delay(1000))`)
2. On success the component writes the `User` object to `localStorage` and the `authStore`
3. `authStore.init()` rehydrates from `localStorage` on app start
4. `authInterceptor` attaches `Authorization: Bearer <token>` to every outgoing request and clears auth + redirects to `/login` on 401

Role is derived from email at login time (`email.includes('admin')` → `ADMIN`, otherwise `MANAGER`). `VIEWER` role exists in the type but is not yet assigned by `AuthService`.

### Guards

Both guards are functional (`CanActivateFn`), not class-based:
- `authGuard` — checks `authStore.isAuthenticated()`, redirects to `/login`
- `roleGuard` — checks `route.data['roles']` against `authStore.role()`, redirects to `/dashboard`

### Layout shell

`AppLayoutComponent` (`core/layout/app-layout/`) provides the sidebar + header wrapper for all protected pages. `SidebarComponent` reads `authStore.role()` to conditionally show admin-only nav links.

## Planned modules (not yet built)

The 30-day roadmap adds: global Toast service, reusable Modal service, signal stores for users/analytics, Dashboard charts, User Management table (search/filter/bulk actions), Analytics module (server-side pagination, CSV export), RBAC directives (`HasRoleDirective`, `HasPermissionPipe`), Audit Log, Feature flags service, dark/light theme, OnPush on all components, ESLint + Prettier + Husky, Cypress E2E, GitHub Actions CI, Dockerfile.
