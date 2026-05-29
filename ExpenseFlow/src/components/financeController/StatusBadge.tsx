import type { ClaimStatus } from "../../types/claim";
import { getStatusClass } from "../../utils/claimHelpers";

interface StatusBadgeProps {
  status: ClaimStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <span className={`status-badge ${getStatusClass(status)}`}>{status.replaceAll("_", " ")}</span>;
};

export default StatusBadge;
