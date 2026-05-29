import type { Claim } from "../../types/claim";
import StatusBadge from "./StatusBadge";
import FinalizeButton from "./FinalizeButton";

interface FinalizationTableProps {
  claims: Claim[];
  onFinalize: (claimId: string) => void;
}

const FinalizationTable = ({ claims, onFinalize }: FinalizationTableProps) => {
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
            <th>Approved on</th>
            <th>Action</th>
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
              <td>
                <FinalizeButton
                  onFinalize={() => onFinalize(claim.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalizationTable;
