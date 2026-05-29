import type { Claim } from "../types/claim";

interface RoleBasedActionPanelProps {
  claim: Claim;
  disableApprove: boolean;
  onApprove: () => void;
  onRequestChanges: () => void;
  onReject: () => void;
}

const RoleBasedActionPanel = ({
  claim,
  disableApprove,
  onApprove,
  onRequestChanges,
  onReject,
}: RoleBasedActionPanelProps) => {
  const isReviewable =
    claim.status === "SUBMITTED" ||
    claim.status === "RESUBMITTED" ||
    claim.status === "RISK_FLAGGED";

  return (
    <div className="role-action-panel">
      <p className="panel-label">Reviewer actions</p>
      <div className="action-buttons">
        <button
          type="button"
          className="primary"
          onClick={onApprove}
          disabled={!isReviewable || disableApprove}
        >
          Approve
        </button>
        <button
          type="button"
          className="secondary"
          onClick={onRequestChanges}
          disabled={!isReviewable}
        >
          Request changes
        </button>
        <button
          type="button"
          className="danger"
          onClick={onReject}
          disabled={!isReviewable}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RoleBasedActionPanel;
