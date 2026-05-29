import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import type { Claim, ClaimStatus } from "../types/claim";
import { createClaim, getClaims, submitClaim, updateClaim } from "../utils/localStorage";
import { generateClaimId } from "../utils/claimHelpers";
import { appendAuditLog } from "../utils/reviewerHelpers";
import {
  initialFormData,
  EMPLOYEE_ID,
  EMPLOYEE_NAME,
} from "../constants/employeeConstants";

export interface ClaimFormData {
  id: string;
  title: string;
  description: string;
  amount: string;
  category: string;
  date: string;
  receipt: File | null;
  receiptName: string;
  evidence: number;
  status: ClaimStatus;
  createdAt: string;
  employeeName: string;
  employeeId: string;
  reviewerRemarks: string;
  auditTimeline: Claim["auditTimeline"];
}

export interface PopupState {
  title: string;
  message: string;
  type: "success" | "error";
  isOpen: boolean;
}

export const useEmployeeClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "ALL">("ALL");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<ClaimFormData>(initialFormData);
  const [editingClaimId, setEditingClaimId] = useState<string | null>(null);
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

  const loadClaims = () => {
    setClaims(getClaims());
  };

  const buildClaim = (status: ClaimStatus): Claim => {
    const now = new Date().toISOString();
    const baseClaim: Claim = {
      id: formData.id || generateClaimId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      amount: Number(formData.amount) || 0,
      evidence: formData.receipt ? 1 : formData.evidence,
      category: formData.category,
      date: formData.date,
      receiptName: formData.receiptName || formData.receipt?.name || "",
      status,
      createdAt: formData.createdAt || now,
      updatedAt: now,
      employeeName: formData.employeeName || EMPLOYEE_NAME,
      employeeId: formData.employeeId || EMPLOYEE_ID,
      reviewerRemarks: formData.reviewerRemarks || undefined,
      auditTimeline:
        formData.auditTimeline?.length > 0
          ? formData.auditTimeline
          : [
              {
                id: `AUD-${Math.floor(100000 + Math.random() * 900000)}`,
                action: "Created draft",
                user: EMPLOYEE_NAME,
                role: "Employee",
                timestamp: formData.createdAt || now,
              },
            ],
    };

    if (status === "SUBMITTED" || status === "RESUBMITTED") {
      const action =
        status === "RESUBMITTED"
          ? "Resubmitted with updated invoice"
          : "Submitted claim";

      return appendAuditLog(
        baseClaim,
        action,
        formData.status || "DRAFT",
        status,
        baseClaim.employeeName,
        "Employee"
      );
    }

    return baseClaim;
  };

  const handleNewClaim = () => {
    const now = new Date().toISOString();

    setFormData({
      ...initialFormData,
      id: generateClaimId(),
      createdAt: now,
      employeeName: EMPLOYEE_NAME,
      employeeId: EMPLOYEE_ID,
    });
    setEditingClaimId(null);
    setIsFormOpen(true);
  };

  const handleOpenClaim = (claim: Claim) => {
    setFormData({
      id: claim.id,
      title: claim.title,
      description: claim.description,
      amount: claim.amount.toFixed(2),
      category: claim.category,
      date: claim.date,
      receipt: null,
      receiptName: claim.receiptName || "",
      evidence: claim.evidence,
      status: claim.status,
      createdAt: claim.createdAt,
      employeeName: claim.employeeName,
      employeeId: claim.employeeId,
      reviewerRemarks: claim.reviewerRemarks || "",
      auditTimeline: claim.auditTimeline,
    });
    setEditingClaimId(claim.id);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setFormData(initialFormData);
    setEditingClaimId(null);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = event.target.name as keyof ClaimFormData;
    const { value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      receipt: file,
      receiptName: file ? file.name : prev.receiptName,
      evidence: file ? 1 : prev.evidence,
    }));
  };

  const isDuplicateClaimId = () =>
    claims.some(
      (item) => item.id === formData.id && item.id !== editingClaimId
    );

  const handleSaveDraft = () => {
    if (!formData.id) {
      setFormData((prev) => ({ ...prev, id: generateClaimId() }));
    }

    if (formData.id && isDuplicateClaimId()) {
      openPopup(
        "error",
        "Claim ID duplicate",
        "This claim ID already exists. Please choose another ID."
      );
      return;
    }

    const claim = buildClaim(formData.status || "DRAFT");

    if (editingClaimId) {
      updateClaim(claim);
    } else {
      createClaim(claim);
      setEditingClaimId(claim.id);
    }

    loadClaims();
    setFormData((prev) => ({
      ...prev,
      id: claim.id,
      createdAt: claim.createdAt,
      status: claim.status,
    }));

    openPopup("success", "Draft saved", "Claim saved to drafts successfully.");
  };

  const handleSubmitForReview = () => {
    const hasEvidence =
      formData.evidence > 0 || Boolean(formData.receiptName);

    const isValid =
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.amount.trim() !== "" &&
      Number(formData.amount) > 0 &&
      formData.date.trim() !== "" &&
      hasEvidence;

    if (!isValid) {
      openPopup(
        "error",
        "Cannot submit",
        "Complete all required fields and attach evidence before submission."
      );
      return;
    }

    if (formData.id && isDuplicateClaimId()) {
      openPopup(
        "error",
        "Claim ID duplicate",
        "This claim ID already exists. Please choose another ID."
      );
      return;
    }

    const nextStatus =
      formData.status === "CHANGES_REQUESTED" ? "RESUBMITTED" : "SUBMITTED";
    const claim = buildClaim(nextStatus);

    if (editingClaimId) {
      updateClaim(claim);
    } else {
      createClaim(claim);
    }

    loadClaims();
    setIsFormOpen(false);
    setFormData(initialFormData);
    setEditingClaimId(null);

    openPopup(
      "success",
      nextStatus === "RESUBMITTED" ? "Claim resubmitted" : "Claim submitted",
      nextStatus === "RESUBMITTED"
        ? "Claim updated and resubmitted for review."
        : "Claim created and submitted for review."
    );
  };

  const handleSubmitDraftRow = (claimId: string) => {
    const draft = claims.find((item) => item.id === claimId);

    if (!draft) {
      openPopup("error", "Claim missing", "Could not locate the draft claim.");
      return;
    }

    const hasEvidence = draft.evidence > 0 || Boolean(draft.receiptName);

    if (!hasEvidence) {
      openPopup(
        "error",
        "Cannot submit",
        "Attach evidence before submitting this draft."
      );
      return;
    }

    const updatedClaim = submitClaim(claimId);

    if (updatedClaim) {
      loadClaims();
      openPopup(
        "success",
        "Claim submitted",
        "Draft claim submitted for review."
      );
    }
  };

  const filteredClaims = useMemo(
    () =>
      claims.filter((claim) => {
        const matchesSearch =
          claim.id.toLowerCase().includes(search.toLowerCase()) ||
          claim.title.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "ALL" || claim.status === statusFilter;

        return matchesSearch && matchesStatus;
      }),
    [claims, search, statusFilter]
  );

  const draftClaims = useMemo(
    () => claims.filter((claim) => claim.status === "DRAFT"),
    [claims]
  );

  const draftCount = draftClaims.length;
  const actionRequiredCount = claims.filter(
    (c) => c.status === "CHANGES_REQUESTED"
  ).length;
  const reviewCount = claims.filter(
    (c) =>
      c.status === "SUBMITTED" ||
      c.status === "RESUBMITTED" ||
      c.status === "RISK_FLAGGED"
  ).length;
  const completedCount = claims.filter(
    (c) => c.status === "APPROVED" || c.status === "FINALIZED"
  ).length;

  return {
    claims,
    filteredClaims,
    draftClaims,
    popup,
    formData,
    isFormOpen,
    editingClaimId,
    search,
    statusFilter,
    draftCount,
    actionRequiredCount,
    reviewCount,
    completedCount,
    handleNewClaim,
    handleOpenClaim,
    handleCloseForm,
    handleInputChange,
    handleFileChange,
    handleSaveDraft,
    handleSubmitForReview,
    handleSubmitDraftRow,
    setSearch,
    setStatusFilter,
    closePopup,
  };
};
