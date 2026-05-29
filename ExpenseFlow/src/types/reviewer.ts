export interface AuditItem {
  id: string;
  action: string;
  fromStatus?: string;
  toStatus?: string;
  user: string;
  role: string;
  timestamp: string;
  remarks?: string;
}
