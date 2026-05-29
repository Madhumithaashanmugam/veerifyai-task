import type { Claim } from "../../types/claim";
import { formatTableDate } from "../../utils/dateHelpers";

interface DraftClaimsTableProps {
  draftClaims: Claim[];
  onOpenClaim: (claim: Claim) => void;
  onSubmitDraft: (claimId: string) => void;
}

const DraftClaimsTable = ({
  draftClaims,
  onOpenClaim,
  onSubmitDraft,
}: DraftClaimsTableProps) => {
  return (
    <div className="section">
      <div className="section-title">
        <h3>Drafts</h3>
        <p>Continue editing, attach evidence and submit when ready.</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>CLAIM</th>
              <th>PURPOSE</th>
              <th>AMOUNT</th>
              <th>EVIDENCE</th>
              <th>UPDATED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {draftClaims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td className="italic-cell">{claim.title || "Untitled"}</td>
                <td>${claim.amount.toFixed(2)}</td>
                <td>{claim.evidence} files</td>
                <td>{formatTableDate(claim.updatedAt)}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="open-btn"
                      onClick={() => onOpenClaim(claim)}
                    >
                      Open
                    </button>
                    <button
                      className="submit-btn"
                      onClick={() => onSubmitDraft(claim.id)}
                    >
                      Submit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DraftClaimsTable;
