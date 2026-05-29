import { getClaims, saveClaims, updateClaim } from "./localStorage";
import type { Claim } from "../types/claim";

export const loadReviewerClaims = (): Claim[] => getClaims();

export const saveReviewerClaims = (claims: Claim[]): void => {
  saveClaims(claims);
};

export const persistReviewerClaim = (claim: Claim): Claim => {
  return updateClaim(claim);
};
