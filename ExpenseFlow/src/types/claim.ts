import type { AuditItem } from "./reviewer";

export type ClaimStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "RESUBMITTED"
  | "CHANGES_REQUESTED"
  | "APPROVED"
  | "REJECTED"
  | "RISK_FLAGGED"
  | "FINALIZED";

export interface Claim {
  id: string;
  title: string;
  description: string;
  amount: number;
  evidence: number;
  category: string;
  date: string;
  receiptName?: string;
  status: ClaimStatus;
  createdAt: string;
  updatedAt: string;
  employeeName: string;
  employeeId: string;
  reviewerRemarks?: string;
  auditTimeline: AuditItem[];
}
