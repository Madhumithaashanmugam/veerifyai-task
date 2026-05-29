import type { Claim } from "../types/claim";
import { appendAuditLog } from "./reviewerHelpers";

export const getApprovedClaims = (claims: Claim[]) =>
  claims.filter((claim) => claim.status === "APPROVED");

export const getFinalizedClaims = (claims: Claim[]) =>
  claims.filter((claim) => claim.status === "FINALIZED");

export const calculatePendingAmount = (claims: Claim[]) =>
  claims.reduce((total, claim) => total + claim.amount, 0);

export const calculateFinalizedAmount = (claims: Claim[]) =>
  claims.reduce((total, claim) => total + claim.amount, 0);

export const calculateAverageTicket = (claims: Claim[]) => {
  if (!claims.length) {
    return 0;
  }

  return calculatePendingAmount(claims) / claims.length;
};

export const finalizeClaim = (
  claim: Claim,
  user: string,
  role: string
): Claim => {
  return appendAuditLog(
    claim,
    "Finalized",
    claim.status,
    "FINALIZED",
    user,
    role,
    "Finalized for general ledger booking"
  );
};
