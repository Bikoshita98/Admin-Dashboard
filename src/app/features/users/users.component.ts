import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRecord, Role } from '../../core/models/user.model';

const MOCK_USERS: UserRecord[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@ep.com',
    role: 'ADMIN',
    status: 'Active',
    joinedAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    email: 'rahul@ep.com',
    role: 'MANAGER',
    status: 'Active',
    joinedAt: '2024-02-14',
  },
  {
    id: '3',
    name: 'Sneha Iyer',
    email: 'sneha@ep.com',
    role: 'VIEWER',
    status: 'Inactive',
    joinedAt: '2024-03-05',
  },
  {
    id: '4',
    name: 'Vikram Das',
    email: 'vikram@ep.com',
    role: 'MANAGER',
    status: 'Active',
    joinedAt: '2024-03-22',
  },
  {
    id: '5',
    name: 'Ananya Roy',
    email: 'ananya@ep.com',
    role: 'VIEWER',
    status: 'Active',
    joinedAt: '2024-04-01',
  },
  {
    id: '6',
    name: 'Karan Nair',
    email: 'karan@ep.com',
    role: 'ADMIN',
    status: 'Inactive',
    joinedAt: '2024-04-18',
  },
  {
    id: '7',
    name: 'Divya Pillai',
    email: 'divya@ep.com',
    role: 'VIEWER',
    status: 'Active',
    joinedAt: '2024-05-09',
  },
  {
    id: '8',
    name: 'Arjun Bose',
    email: 'arjun@ep.com',
    role: 'MANAGER',
    status: 'Active',
    joinedAt: '2024-06-30',
  },
  {
    id: '9',
    name: 'Meera Joshi',
    email: 'meera@ep.com',
    role: 'VIEWER',
    status: 'Inactive',
    joinedAt: '2024-07-15',
  },
  {
    id: '10',
    name: 'Rohan Gupta',
    email: 'rohan@ep.com',
    role: 'ADMIN',
    status: 'Active',
    joinedAt: '2024-08-20',
  },
];

type RoleFilter = Role | 'ALL';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  searchQuery = signal('');
  roleFilter = signal<RoleFilter>('ALL');

  readonly roleOptions: RoleFilter[] = ['ALL', 'ADMIN', 'MANAGER', 'VIEWER'];

  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const role = this.roleFilter();

    return MOCK_USERS.filter((u) => {
      const matchesSearch =
        !query || u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
      const matchesRole = role === 'ALL' || u.role === role;
      return matchesSearch && matchesRole;
    });
  });

  onSearch(value: string) {
    this.searchQuery.set(value);
  }

  onRoleFilter(value: string) {
    this.roleFilter.set(value as RoleFilter);
  }
}
