import { signal, computed } from '@angular/core';
import { User } from '../../core/models/user.model';

class AuthStore {
    private _user = signal<User | null>(null);
    
}