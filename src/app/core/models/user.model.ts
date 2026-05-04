export type Role = 'ADMIN' | 'MANAGER' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  token: string;
}

export type UserStatus = 'Active' | 'Inactive';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  joinedAt: string;
}
