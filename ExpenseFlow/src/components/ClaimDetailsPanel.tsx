import type { Claim } from "../types/claim";
import StatusBadge from "./StatusBadge";

interface ClaimDetailsPanelProps {
  claim: Claim;
}

const ClaimDetailsPanel = ({ claim }: ClaimDetailsPanelProps) => {
  return (
    <div className="claim-details-panel">
      <div className="panel-header">
        <div>
          <p>Claim details</p>
          <h3>{claim.title || "Untitled claim"}</h3>
        </div>
        <StatusBadge status={claim.status} />
      </div>

      <div className="panel-grid">
        <div>
          <p className="panel-label">Claim ID</p>
          <p>{claim.id}</p>
        </div>
        <div>
          <p className="panel-label">Employee</p>
          <p>{claim.employeeName}</p>
        </div>
        <div>
          <p className="panel-label">Amount</p>
          <p>${claim.amount.toFixed(2)}</p>
        </div>
        <div>
          <p className="panel-label">Category</p>
          <p>{claim.category}</p>
        </div>
        <div>
          <p className="panel-label">Date</p>
          <p>{claim.date || "—"}</p>
        </div>
        <div>
          <p className="panel-label">Receipt</p>
          <p>{claim.receiptName || "No evidence"}</p>
        </div>
      </div>

      <div className="panel-section">
        <p className="panel-label">Description</p>
        <p>{claim.description || "No description provided."}</p>
      </div>

      {claim.reviewerRemarks && (
        <div className="panel-section">
          <p className="panel-label">Reviewer remarks</p>
          <p>{claim.reviewerRemarks}</p>
        </div>
      )}
    </div>
  );
};

export default ClaimDetailsPanel;
