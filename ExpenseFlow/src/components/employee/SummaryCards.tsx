import {
  FilePenLine,
  AlertCircle,
  Plane,
  CheckCircle2,
} from "lucide-react";

interface SummaryCardsProps {
  draftCount: number;
  actionRequiredCount: number;
  reviewCount: number;
  completedCount: number;
}

const SummaryCards = ({
  draftCount,
  actionRequiredCount,
  reviewCount,
  completedCount,
}: SummaryCardsProps) => {
  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-top">
          <p>DRAFTS</p>
          <FilePenLine size={20} />
        </div>
        <h2>{draftCount}</h2>
      </div>

      <div className="summary-card">
        <div className="summary-top orange">
          <p>ACTION REQUIRED</p>
          <AlertCircle size={20} />
        </div>
        <h2>{actionRequiredCount}</h2>
      </div>

      <div className="summary-card">
        <div className="summary-top blue">
          <p>IN REVIEW</p>
          <Plane size={20} />
        </div>
        <h2>{reviewCount}</h2>
      </div>

      <div className="summary-card">
        <div className="summary-top green">
          <p>COMPLETED</p>
          <CheckCircle2 size={20} />
        </div>
        <h2>{completedCount}</h2>
      </div>
    </div>
  );
};

export default SummaryCards;
