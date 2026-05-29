import type { Claim } from "../../types/claim";
import StatusBadge from "./StatusBadge";

interface FinalizedArchiveProps {
  claims: Claim[];
}

const FinalizedArchive = ({ claims }: FinalizedArchiveProps) => {
  return (
    <div className="controller-table-container">
      <table className="controller-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Finalized on</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.id}</td>
              <td>{claim.employeeName}</td>
              <td>{claim.title}</td>
              <td>${claim.amount.toFixed(2)}</td>
              <td>
                <StatusBadge status={claim.status} />
              </td>
              <td>{new Date(claim.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalizedArchive;
