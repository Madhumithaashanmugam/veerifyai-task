import { Upload, X } from "lucide-react";
import type { ChangeEvent } from "react";

import type { ClaimStatus } from "../../types/claim";
import type { AuditItem } from "../../types/reviewer";

import StatusBadge from "../StatusBadge";
import AuditTimeline from "./AuditTimeline";
import ValidationWarningBox from "../ValidationWarningBox";

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
  auditTimeline: AuditItem[];
}

interface EmployeeFormProps {
  isOpen: boolean;
  formData: ClaimFormData;
  editingClaimId: string | null;

  onClose: () => void;

  onInputChange: (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => void;

  onFileChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;

  onSaveDraft: () => void;

  onSubmitReview: () => void;
}

const EmployeeForm = ({
  isOpen,
  formData,
  onClose,
  onInputChange,
  onFileChange,
  onSaveDraft,
  onSubmitReview,
}: EmployeeFormProps) => {
  if (!isOpen) {
    return null;
  }

  const hasEvidence =
    formData.evidence > 0 ||
    Boolean(formData.receiptName);

  const submitDisabled =
    !formData.title.trim() ||
    !formData.description.trim() ||
    !formData.amount.trim() ||
    Number(formData.amount) <= 0 ||
    !formData.date.trim() ||
    !hasEvidence;

  return (
    <div className="form-overlay">
      <div className="form-panel">
        <div className="form-panel-header">
          <div>
            <div className="form-panel-title">
              <h2>
                {formData.id || "EXP-0000"}
              </h2>

              <StatusBadge
                status={formData.status}
              />
            </div>

            {/* <p className="form-panel-user">
              Alice Chen • E-001
            </p> */}
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className="form-content">
          <div className="form-field-grid">
            <div className="form-group">
              <label>
                Amount (USD)*
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={onInputChange}
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>
                Claim ID*
              </label>

              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={onInputChange}
                placeholder="EXP-2003"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Purpose*</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              placeholder="Enter claim purpose"
            />
          </div>

          <div className="form-group">
            <label>
              Description*
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              placeholder="Describe the expense details"
              rows={6}
            />
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label>
              Evidence Upload
            </label>

            <div className="file-upload">
              <input
                type="file"
                id="receipt-file"
                onChange={onFileChange}
                accept="image/*,.pdf"
              />

              <label
                htmlFor="receipt-file"
                className="upload-label"
              >
                <Upload size={20} />

                <span>
                  {formData.receipt
                    ? formData.receipt.name
                    : formData.receiptName
                    ? formData.receiptName
                    : "Upload a receipt or evidence file"}
                </span>
              </label>
            </div>

            {!hasEvidence && (
              <ValidationWarningBox message="Evidence is required before submission." />
            )}
          </div>

          <AuditTimeline
            items={
              formData.auditTimeline || []
            }
          />
        </div>

        <div className="form-footer form-action-row">
          <button
            className="save-changes-btn"
            onClick={onSaveDraft}
          >
            Save changes
          </button>

          <button
            className="submit-review-btn"
            onClick={onSubmitReview}
            disabled={submitDisabled}
          >
            Submit for review
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;