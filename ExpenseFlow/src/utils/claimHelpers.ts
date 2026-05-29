import type { ClaimStatus } from "../types/claim";

export const generateClaimId = (): string => {
  return `EXP-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const getStatusClass = (status: ClaimStatus): string => {
  switch (status) {
    case "DRAFT":
      return "draft";

    case "SUBMITTED":
    case "RESUBMITTED":
      return "submitted";

    case "CHANGES_REQUESTED":
      return "changes";

    case "APPROVED":
      return "approved";

    case "REJECTED":
      return "rejected";

    case "RISK_FLAGGED":
      return "risk";

    case "FINALIZED":
      return "finalized";

    default:
      return "";
  }
};
