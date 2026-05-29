import SearchQueue from "./SearchQueue";
import ReviewerClaimCard from "./ReviewerClaimCard";
import type { Claim } from "../../types/claim";

interface ReviewerSidebarProps {
  queue: {
    submitted: Claim[];
    resubmitted: Claim[];
    riskFlagged: Claim[];
  };
  selectedClaimId?: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectClaim: (claimId: string) => void;
}

const ReviewerSidebar = ({
  queue,
  selectedClaimId,
  search,
  onSearchChange,
  onSelectClaim,
}: ReviewerSidebarProps) => {
  return (
    <div className="reviewer-sidebar">
      <SearchQueue
        search={search}
        onSearchChange={onSearchChange}
        submittedCount={queue.submitted.length}
        resubmittedCount={queue.resubmitted.length}
        riskCount={queue.riskFlagged.length}
      />

      <div className="queue-section">
        <h4>Resubmitted claims</h4>
        <div className="queue-list">
          {queue.resubmitted.map((claim) => (
            <ReviewerClaimCard
              key={claim.id}
              claim={claim}
              selected={claim.id === selectedClaimId}
              onSelect={onSelectClaim}
            />
          ))}
          {!queue.resubmitted.length && <p>No resubmitted claims.</p>}
        </div>
      </div>

      <div className="queue-section">
        <h4>Submitted claims</h4>
        <div className="queue-list">
          {queue.submitted.map((claim) => (
            <ReviewerClaimCard
              key={claim.id}
              claim={claim}
              selected={claim.id === selectedClaimId}
              onSelect={onSelectClaim}
            />
          ))}
          {!queue.submitted.length && <p>No submitted claims.</p>}
        </div>
      </div>

      <div className="queue-section">
        <h4>Risk flagged claims</h4>
        <div className="queue-list">
          {queue.riskFlagged.map((claim) => (
            <ReviewerClaimCard
              key={claim.id}
              claim={claim}
              selected={claim.id === selectedClaimId}
              onSelect={onSelectClaim}
            />
          ))}
          {!queue.riskFlagged.length && <p>No risk claims.</p>}
        </div>
      </div>
    </div>
  );
};

export default ReviewerSidebar;
