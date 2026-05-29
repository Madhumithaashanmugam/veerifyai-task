import type { Claim } from "../../types/claim";
import { getRiskFlags } from "../../utils/reviewerHelpers";

interface ReviewerRemindersProps {
  claim?: Claim | null;
}

const ReviewerReminders = ({ claim }: ReviewerRemindersProps) => {
  if (!claim) {
    return (
      <div className="reviewer-reminders reviewer-card">
        <div className="section-title">
          <p>Reviewer reminders</p>
        </div>
        <div className="details">
          <p>Select a claim to see compliance notes and next steps.</p>
        </div>
      </div>
    );
  }

  const riskWarning = getRiskFlags(claim);

  return (
    <div className="reviewer-reminders reviewer-card">
      <div className="section-title">
        <p>Reviewer reminders</p>
      </div>
      <div className="details">
        <ul>
          <li>Confirm the expense matches the requested category.</li>
          <li>Verify attached evidence before approving.</li>
          {riskWarning && (
            <li>
              High-risk claim: amount over $1,000 or missing evidence.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReviewerReminders;
