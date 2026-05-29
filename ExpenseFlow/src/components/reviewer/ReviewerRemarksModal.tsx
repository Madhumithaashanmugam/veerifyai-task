import { useState } from "react";

interface ReviewerRemarksModalProps {
  open: boolean;
  action: "REQUEST_CHANGES" | "REJECT" | null;
  onClose: () => void;
  onSave: (remarks: string) => void;
}

const ReviewerRemarksModal = ({
  open,
  action,
  onClose,
  onSave,
}: ReviewerRemarksModalProps) => {
  const [remarks, setRemarks] = useState("");

  if (!open) {
    return null;
  }

  const label = action === "REJECT" ? "Rejection reason" : "Request changes reason";

  return (
    <div className="reviewer-remarks-modal">
      <div className="modal-card">
        <h3>{action === "REJECT" ? "Reject claim" : "Request changes"}</h3>
        <p>{action === "REJECT" ? "Provide a brief rejection reason." : "Explain what should be updated before resubmission."}</p>
        <textarea
          value={remarks}
          onChange={(event) => setRemarks(event.target.value)}
          placeholder={label}
        />

        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="primary"
            onClick={() => {
              onSave(remarks.trim());
              setRemarks("");
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewerRemarksModal;
