import type { Claim } from "../../types/claim";
import ClaimStatusBadge from "./ClaimStatusBadge";

interface ReviewerClaimCardProps {
  claim: Claim;
  selected: boolean;
  onSelect: (claimId: string) => void;
}

const ReviewerClaimCard = ({ claim, selected, onSelect }: ReviewerClaimCardProps) => {
  return (
    <button
      type="button"
      className={`queue-item ${selected ? "active" : ""}`}
      onClick={() => onSelect(claim.id)}
    >
      <div>
        <h5>{claim.title || "Untitled claim"}</h5>
        <span>{claim.employeeName}</span>
      </div>
      <ClaimStatusBadge status={claim.status} />
    </button>
  );
};

export default ReviewerClaimCard;
