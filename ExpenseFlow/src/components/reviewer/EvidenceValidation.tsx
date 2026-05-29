import type { Claim } from "../../types/claim";

interface EvidenceValidationProps {
  claim: Claim;
}

const EvidenceValidation = ({ claim }: EvidenceValidationProps) => {
  const hasEvidence = claim.evidence > 0 && !!claim.receiptName;

  return (
    <div className="evidence-validation">
      <div className="section-title">
        <p>Evidence validation</p>
        <span className={`badge ${hasEvidence ? "success" : "warning"}`}>
          {hasEvidence ? "Sufficient evidence" : "Evidence missing"}
        </span>
      </div>

      <div className="workflow-ownership details">
        <p>
          {hasEvidence
            ? `Receipt: ${claim.receiptName}`
            : "No receipt was attached with this claim."}
        </p>
        <p>
          {hasEvidence
            ? "This claim includes the required evidence for review."
            : "Please verify supporting documentation before approving."}
        </p>
      </div>
    </div>
  );
};

export default EvidenceValidation;
