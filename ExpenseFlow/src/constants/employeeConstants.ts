import type { ClaimStatus } from "../types/claim";

export const EMPLOYEE_NAME = "Alice Chen";
export const EMPLOYEE_ID = "E-001";
export const DEFAULT_CLAIM_CATEGORY = "Travel";
export const DEFAULT_CLAIM_STATUS: ClaimStatus = "DRAFT";

export const initialFormData = {
  id: "",
  title: "",
  description: "",
  amount: "",
  category: DEFAULT_CLAIM_CATEGORY,
  date: "",
  receipt: null,
  receiptName: "",
  evidence: 0,
  status: DEFAULT_CLAIM_STATUS,
  createdAt: "",
  employeeName: EMPLOYEE_NAME,
  employeeId: EMPLOYEE_ID,
  reviewerRemarks: "",
  auditTimeline: [] as unknown as [],
};
