import { Paperclip, MessageSquare } from "lucide-react";
import type { Claim } from "../../types/claim";
import ClaimStatusBadge from "./ClaimStatusBadge";

interface ClaimCardProps {
  claim: Claim;
  onOpenClaim?: (claim: Claim) => void;
}

const ClaimCard = ({ claim, onOpenClaim }: ClaimCardProps) => {
  const isEditable =
    claim.status === "DRAFT" || claim.status === "CHANGES_REQUESTED";

  return (
    <div className="claim-card">
      <div className="claim-card-top">
        <p className="claim-id">{claim.id}</p>
        <ClaimStatusBadge status={claim.status} />
      </div>

      <h4>{claim.title}</h4>

      <p className="claim-description">{claim.description}</p>

      <div className="claim-footer">
        <h2>${claim.amount.toFixed(2)}</h2>

        <div className="claim-meta">
          <div>
            <Paperclip size={14} />
            {claim.evidence}
          </div>

          <MessageSquare size={14} />
        </div>
      </div>

      {isEditable && onOpenClaim && (
        <button
          className="open-claim-card-btn"
          type="button"
          onClick={() => onOpenClaim(claim)}
        >
          Open claim
        </button>
      )}
    </div>
  );
};

export default ClaimCard;
