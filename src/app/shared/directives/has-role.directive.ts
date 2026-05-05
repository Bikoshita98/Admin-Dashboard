import { Directive, inject, Input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { authStore } from '../../features/auth/auth.store';
import { Role } from '../../core/models/user.model';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  private requiredRoles: Role[] = [];

  constructor() {
    effect(() => {
      const currentRole = authStore.role();
      const hasAccess = !!currentRole && this.requiredRoles.includes(currentRole);

      this.viewContainer.clear();

      if (hasAccess) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  @Input() set appHasRole(roles: Role | Role[]) {
    this.requiredRoles = Array.isArray(roles) ? roles : [roles];
  }
}
