import { Pipe, PipeTransform } from '@angular/core';
import { authStore } from '../../features/auth/auth.store';
import { Role } from '../../core/models/user.model';

@Pipe({
  name: 'hasPermission',
  pure: false,
})
export class HasPermissionPipe implements PipeTransform {
  transform(roles: Role | Role[]): boolean {
    const currentRole = authStore.role();

    if (!currentRole) return false;

    return Array.isArray(roles) ? roles.includes(currentRole) : roles === currentRole;
  }
}
