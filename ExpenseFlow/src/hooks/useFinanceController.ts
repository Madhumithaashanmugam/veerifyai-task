import { useEffect, useMemo, useState } from "react";
import type { Claim } from "../types/claim";
import { getClaims, updateClaim } from "../utils/localStorage";
import {
  getApprovedClaims,
  getFinalizedClaims,
  calculateAverageTicket,
  calculateFinalizedAmount,
  calculatePendingAmount,
  finalizeClaim,
} from "../utils/financeControllerHelpers";

interface PopupState {
  title: string;
  message: string;
  type: "success" | "error";
  isOpen: boolean;
}

export const useFinanceController = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"queue" | "archive">("queue");
  const [popup, setPopup] = useState<PopupState | null>(null);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  const openPopup = (type: "success" | "error", title: string, message: string) => {
    setPopup({ isOpen: true, type, title, message });
  };

  const closePopup = () => {
    setPopup(null);
  };

  const approvedClaims = useMemo(() => getApprovedClaims(claims), [claims]);
  const finalizedClaims = useMemo(() => getFinalizedClaims(claims), [claims]);

  const filteredApproved = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return approvedClaims.filter((claim) =>
      [claim.id, claim.employeeName, claim.title]
        .map((value) => value.toLowerCase())
        .some((value) => value.includes(normalized))
    );
  }, [approvedClaims, search]);

  const filteredFinalized = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return finalizedClaims.filter((claim) =>
      [claim.id, claim.employeeName, claim.title]
        .map((value) => value.toLowerCase())
        .some((value) => value.includes(normalized))
    );
  }, [finalizedClaims, search]);

  const pendingAmount = useMemo(
    () => calculatePendingAmount(approvedClaims),
    [approvedClaims]
  );
  const finalizedAmount = useMemo(
    () => calculateFinalizedAmount(finalizedClaims),
    [finalizedClaims]
  );
  const averageTicket = useMemo(
    () => calculateAverageTicket(approvedClaims),
    [approvedClaims]
  );

  const onFinalize = (claimId: string) => {
    const claim = claims.find((item) => item.id === claimId);
    if (!claim) {
      openPopup("error", "Claim missing", "Could not locate the selected claim.");
      return;
    }

    const finalized = finalizeClaim(claim, "Sam Okafor", "Finance Controller");
    updateClaim(finalized);
    setClaims((current) =>
      current.map((item) => (item.id === finalized.id ? finalized : item))
    );

    openPopup("success", "Claim finalized", "Claim moved to the finalized archive.");
  };

  return {
    activeTab,
    search,
    popup,
    approvedClaimsCount: approvedClaims.length,
    finalizedClaimsCount: finalizedClaims.length,
    pendingAmount,
    finalizedAmount,
    averageTicket,
    filteredApproved,
    filteredFinalized,
    setSearch,
    setActiveTab,
    onFinalize,
    closePopup,
  };
};
