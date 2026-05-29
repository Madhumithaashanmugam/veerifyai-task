import type { ClaimStatus } from "../../types/claim";
import { getStatusClass } from "../../utils/claimHelpers";

interface ClaimStatusBadgeProps {
  status: ClaimStatus;
}

const ClaimStatusBadge = ({ status }: ClaimStatusBadgeProps) => {
  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
};

export default ClaimStatusBadge;
