import type { AuditItem } from "../types/reviewer";
import type { Claim } from "../types/claim";

const createAuditId = (): string => `AUD-${Math.floor(100000 + Math.random() * 900000)}`;

export const hasDuplicateReceipt = (claim: Claim, claims: Claim[]): boolean => {
  if (!claim.receiptName) {
    return false;
  }

  return claims.some(
    (item) => item.id !== claim.id && item.receiptName === claim.receiptName
  );
};

export const getRiskFlags = (claim: Claim, claims: Claim[] = []): boolean => {
  return (
    claim.amount > 1000 ||
    claim.evidence === 0 ||
    hasDuplicateReceipt(claim, claims)
  );
};

export const getWorkflowOwner = (status: Claim["status"]): string => {
  switch (status) {
    case "SUBMITTED":
    case "RESUBMITTED":
      return "Finance Reviewer";

    case "APPROVED":
      return "Finance Controller";

    case "REJECTED":
      return "Workflow closed";

    default:
      return "Employee";
  }
};

export const getReviewerStats = (claims: Claim[]) => ({
  submitted: claims.filter((claim) => claim.status === "SUBMITTED").length,
  resubmitted: claims.filter((claim) => claim.status === "RESUBMITTED").length,
  riskFlagged: claims.filter((claim) => claim.status === "RISK_FLAGGED").length,
});

export const getReviewerQueue = (claims: Claim[], search: string) => {
  const normalized = search.trim().toLowerCase();

  const matchesSearch = (claim: Claim): boolean => {
    if (!normalized) {
      return true;
    }

    return [claim.id, claim.employeeName, claim.title]
      .map((value) => value.toLowerCase())
      .some((value) => value.includes(normalized));
  };

  const queueClaims = claims.filter(matchesSearch);

  return {
    submitted: queueClaims.filter((claim) => claim.status === "SUBMITTED"),
    resubmitted: queueClaims.filter((claim) => claim.status === "RESUBMITTED"),
    riskFlagged: queueClaims.filter((claim) => claim.status === "RISK_FLAGGED"),
  };
};

export const appendAuditLog = (
  claim: Claim,
  action: string,
  fromStatus: string | undefined,
  toStatus: Claim["status"],
  user: string,
  role: string,
  remarks?: string
): Claim => {
  const auditEntry: AuditItem = {
    id: createAuditId(),
    action,
    fromStatus,
    toStatus,
    user,
    role,
    timestamp: new Date().toISOString(),
    remarks,
  };

  return {
    ...claim,
    status: toStatus,
    updatedAt: new Date().toISOString(),
    reviewerRemarks: remarks,
    auditTimeline: [...claim.auditTimeline, auditEntry],
  };
};

export const updateClaimStatus = (
  claim: Claim,
  status: Claim["status"],
  user: string,
  role: string,
  remarks?: string
): Claim => {
  const action =
    status === "APPROVED"
      ? "Approved"
      : status === "CHANGES_REQUESTED"
      ? "Requested changes"
      : status === "REJECTED"
      ? "Rejected"
      : status === "RESUBMITTED"
      ? "Resubmitted"
      : status === "RISK_FLAGGED"
      ? "Flagged for risk review"
      : "Updated status";

  return appendAuditLog(claim, action, claim.status, status, user, role, remarks);
};

export const getDefaultReviewerSelection = (claims: Claim[]): Claim | null => {
  return (
    claims.find((claim) => claim.status === "RESUBMITTED") ||
    claims.find((claim) => claim.status === "SUBMITTED") ||
    claims.find((claim) => claim.status === "RISK_FLAGGED") ||
    null
  );
};
