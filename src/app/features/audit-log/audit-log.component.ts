import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { AuditLog, AuditSeverity } from '../../core/models/audit-log.model';

const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: '1',
    action: 'User created',
    performedBy: 'Admin',
    target: 'sneha@ep.com',
    timestamp: '2024-08-20 09:12:33',
    severity: 'info',
  },
  {
    id: '2',
    action: 'Role changed to ADMIN',
    performedBy: 'Admin',
    target: 'rohan@ep.com',
    timestamp: '2024-08-20 10:05:11',
    severity: 'warning',
  },
  {
    id: '3',
    action: 'User deleted',
    performedBy: 'Admin',
    target: 'karan@ep.com',
    timestamp: '2024-08-20 11:30:45',
    severity: 'critical',
  },
  {
    id: '4',
    action: 'Exported user report',
    performedBy: 'Rahul Mehta',
    target: 'users.csv',
    timestamp: '2024-08-20 12:15:00',
    severity: 'info',
  },
  {
    id: '5',
    action: 'Failed login attempt',
    performedBy: 'Unknown',
    target: 'priya@ep.com',
    timestamp: '2024-08-20 13:02:55',
    severity: 'warning',
  },
  {
    id: '6',
    action: 'Bulk user import',
    performedBy: 'Admin',
    target: '25 users',
    timestamp: '2024-08-20 14:10:20',
    severity: 'info',
  },
  {
    id: '7',
    action: 'Permission revoked',
    performedBy: 'Admin',
    target: 'vikram@ep.com',
    timestamp: '2024-08-20 15:44:08',
    severity: 'warning',
  },
  {
    id: '8',
    action: 'System config changed',
    performedBy: 'Admin',
    target: 'app.config',
    timestamp: '2024-08-20 16:22:30',
    severity: 'critical',
  },
  {
    id: '9',
    action: 'Password reset triggered',
    performedBy: 'Admin',
    target: 'meera@ep.com',
    timestamp: '2024-08-20 17:05:50',
    severity: 'info',
  },
  {
    id: '10',
    action: 'API key regenerated',
    performedBy: 'Admin',
    target: 'api-key-prod',
    timestamp: '2024-08-20 18:33:14',
    severity: 'critical',
  },
];

type SeverityFilter = AuditSeverity | 'ALL';

@Component({
  selector: 'app-audit-log',
  imports: [],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditLogComponent {
  severityFilter = signal<SeverityFilter>('ALL');
  readonly severityOptions: SeverityFilter[] = ['ALL', 'info', 'warning', 'critical'];

  filteredLogs = computed(() => {
    const severity = this.severityFilter();
    return severity === 'ALL'
      ? MOCK_AUDIT_LOGS
      : MOCK_AUDIT_LOGS.filter((item) => item.severity === severity);
  });

  onSeverityFilter(value: string) {
    this.severityFilter.set(value as SeverityFilter);
  }
}
