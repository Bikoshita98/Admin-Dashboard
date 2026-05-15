export type AuditSeverity = 'info' | 'warning' | 'critical';

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  target: string;
  timestamp: string;
  severity: AuditSeverity;
}
