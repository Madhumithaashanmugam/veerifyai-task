import { Plus } from "lucide-react";

interface EmployeeHeroProps {
  onNewClaim: () => void;
}

const EmployeeHero = ({ onNewClaim }: EmployeeHeroProps) => {
  return (
    <div className="hero-section">
      <div>
        <p className="hero-tag">MY EXPENSE CLAIMS</p>
        <h1>Welcome back</h1>
        <p className="hero-description">
          Manage drafts, respond to reviewer feedback, and track your submissions.
        </p>
      </div>

      <button className="new-claim-btn" onClick={onNewClaim}>
        <Plus size={16} />
        New claim
      </button>
    </div>
  );
};

export default EmployeeHero;
