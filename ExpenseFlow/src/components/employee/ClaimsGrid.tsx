import type { Claim } from "../../types/claim";
import ClaimCard from "./ClaimCard";

interface ClaimsGridProps {
  claims: Claim[];
  onOpenClaim?: (claim: Claim) => void;
}

const ClaimsGrid = ({ claims, onOpenClaim }: ClaimsGridProps) => {
  return (
    <div className="claims-grid">
      {claims.map((claim) => (
        <ClaimCard
          key={claim.id}
          claim={claim}
          onOpenClaim={onOpenClaim}
        />
      ))}
    </div>
  );
};

export default ClaimsGrid;
