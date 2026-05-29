import type { ClaimStatus } from "../types/claim";
import { getStatusClass } from "../utils/claimHelpers";

interface StatusBadgeProps {
  status: ClaimStatus;
  large?: boolean;
}

const StatusBadge = ({ status, large }: StatusBadgeProps) => {
  const className = `status-badge ${getStatusClass(status)}${large ? " large" : ""}`;

  return <span className={className}>{status.replaceAll("_", " ")}</span>;
};

export default StatusBadge;
