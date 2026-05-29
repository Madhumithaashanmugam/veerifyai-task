import { useEffect, useMemo, useState } from "react";
import type { Claim } from "../types/claim";
import { loadReviewerClaims, persistReviewerClaim, saveReviewerClaims } from "../utils/reviewerStorage";
import {
  getDefaultReviewerSelection,
  getReviewerQueue,
  getReviewerStats,
  getRiskFlags,
  updateClaimStatus,
} from "../utils/reviewerHelpers";

interface ReviewerProfile {
  name: string;
  role: string;
  location?: string;
}

interface PopupState {
  title: string;
  message: string;
  type: "success" | "error";
  isOpen: boolean;
}

type ReviewActionType = "REQUEST_CHANGES" | "REJECT";

export const useReviewerClaims = () => {
  const reviewer: ReviewerProfile = {
    name: "Jordan Lee",
    role: "Finance Reviewer",
    location: "ExpenseFlow Review Team",
  };

  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState("");
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [remarksOpen, setRemarksOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<ReviewActionType | null>(null);

  useEffect(() => {
    const storedClaims = loadReviewerClaims();
    const normalizedClaims = storedClaims.map((claim) => {
      if (
        (claim.status === "SUBMITTED" || claim.status === "RESUBMITTED") &&
        getRiskFlags(claim, storedClaims)
      ) {
        return updateClaimStatus(
          claim,
          "RISK_FLAGGED",
          reviewer.name,
          reviewer.role,
          "Flagged for risk review"
        );
      }

      return claim;
    });

    const hasChange = normalizedClaims.some(
      (claim, index) => claim.status !== storedClaims[index]?.status
    );

    if (hasChange) {
      saveReviewerClaims(normalizedClaims);
    }

    setClaims(normalizedClaims);
  }, []);

  useEffect(() => {
    if (selectedClaimId) {
      return;
    }

    const defaultClaim = getDefaultReviewerSelection(claims);

    if (defaultClaim) {
      setSelectedClaimId(defaultClaim.id);
    }
  }, [claims, selectedClaimId]);

  const openPopup = (type: "success" | "error", title: string, message: string) => {
    setPopup({ isOpen: true, type, title, message });
  };

  const closePopup = () => {
    setPopup(null);
  };

  const queue = useMemo(() => getReviewerQueue(claims, search), [claims, search]);
  const reviewStats = useMemo(() => getReviewerStats(claims), [claims]);
  const selectedClaim = useMemo(
    () => claims.find((claim) => claim.id === selectedClaimId) || null,
    [claims, selectedClaimId]
  );

  const selectedIsReviewable =
    selectedClaim?.status === "SUBMITTED" ||
    selectedClaim?.status === "RESUBMITTED" ||
    selectedClaim?.status === "RISK_FLAGGED";

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const onSelectClaim = (claimId: string) => {
    setSelectedClaimId(claimId);
  };

  const onApprove = () => {
    if (!selectedClaim) {
      return;
    }

    const hasEvidence =
      selectedClaim.evidence > 0 || Boolean(selectedClaim.receiptName);

    if (!hasEvidence) {
      openPopup(
        "error",
        "Unable to approve",
        "This claim requires evidence before approval."
      );
      return;
    }

    if (
      selectedClaim.status !== "SUBMITTED" &&
      selectedClaim.status !== "RESUBMITTED" &&
      selectedClaim.status !== "RISK_FLAGGED"
    ) {
      openPopup(
        "error",
        "Invalid action",
        "Only submitted or resubmitted claims can be approved."
      );
      return;
    }

    const updatedClaim = updateClaimStatus(
      selectedClaim,
      "APPROVED",
      reviewer.name,
      reviewer.role,
      "Approved by reviewer"
    );

    persistReviewerClaim(updatedClaim);
    setClaims((current) =>
      current.map((claim) => (claim.id === updatedClaim.id ? updatedClaim : claim))
    );
    openPopup("success", "Claim approved", "Claim has been approved successfully.");
  };

  const onRequestChanges = () => {
    setCurrentAction("REQUEST_CHANGES");
    setRemarksOpen(true);
  };

  const onReject = () => {
    setCurrentAction("REJECT");
    setRemarksOpen(true);
  };

  const onCloseRemarks = () => {
    setRemarksOpen(false);
    setCurrentAction(null);
  };

  const onSaveRemarks = (remarks: string) => {
    if (!selectedClaim) {
      openPopup("error", "No claim selected", "Select a claim first.");
      return;
    }

    if (!remarks) {
      openPopup("error", "Missing remarks", "Please enter a reason for your decision.");
      return;
    }

    const nextStatus =
      currentAction === "REQUEST_CHANGES" ? "CHANGES_REQUESTED" : "REJECTED";

    const updatedClaim = updateClaimStatus(
      selectedClaim,
      nextStatus,
      reviewer.name,
      reviewer.role,
      remarks
    );

    persistReviewerClaim(updatedClaim);
    setClaims((current) =>
      current.map((claim) => (claim.id === updatedClaim.id ? updatedClaim : claim))
    );
    setRemarksOpen(false);
    setCurrentAction(null);

    openPopup(
      "success",
      currentAction === "REQUEST_CHANGES"
        ? "Changes requested"
        : "Claim rejected",
      currentAction === "REQUEST_CHANGES"
        ? "Request changes has been sent to the employee."
        : "Claim rejected successfully."
    );
  };

  return {
    reviewer,
    selectedClaim,
    queue,
    reviewStats,
    search,
    popup,
    remarksOpen,
    currentAction,
    onSearchChange,
    onSelectClaim,
    onApprove,
    onRequestChanges,
    onReject,
    onCloseRemarks,
    onSaveRemarks,
    closePopup,
  };
};
