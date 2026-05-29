import type { Claim } from "../../types/claim";

interface ReviewDecisionProps {
  claim: Claim;
  onApprove: () => void;
  onRequestChanges: () => void;
  onReject: () => void;
}

const ReviewDecision = ({
  claim,
  onApprove,
  onRequestChanges,
  onReject,
}: ReviewDecisionProps) => {
  const disabled = claim.status === "APPROVED" || claim.status === "REJECTED";

  return (
    <div className="review-decision">
      <button
        type="button"
        className="primary"
        onClick={onApprove}
        disabled={disabled}
      >
        Approve
      </button>
      <button
        type="button"
        className="secondary"
        onClick={onRequestChanges}
        disabled={disabled}
      >
        Request changes
      </button>
      <button
        type="button"
        className="danger"
        onClick={onReject}
        disabled={disabled}
      >
        Reject
      </button>
    </div>
  );
};

export default ReviewDecision;
