import type { Claim } from "../types/claim";

interface EvidenceListProps {
  claim: Claim;
}

const EvidenceList = ({ claim }: EvidenceListProps) => {
  const hasEvidence = claim.evidence > 0 || Boolean(claim.receiptName);

  return (
    <div className="evidence-list">
      <p className="panel-label">Evidence</p>
      {hasEvidence ? (
        <div className="evidence-item">
          <strong>{claim.receiptName || "Receipt attached"}</strong>
          <span>{claim.evidence} file{claim.evidence === 1 ? "" : "s"}</span>
        </div>
      ) : (
        <p className="error-text">No evidence attached for this claim.</p>
      )}
    </div>
  );
};

export default EvidenceList;
