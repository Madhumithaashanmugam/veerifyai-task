import type { ClaimStatus } from "../../types/claim";

interface ClaimStatusBadgeProps {
  status: ClaimStatus;
}

const ClaimStatusBadge = ({ status }: ClaimStatusBadgeProps) => {
  const className = `status-badge ${status.toLowerCase().replaceAll("_", "")}`;

  return <span className={className}>{status.replaceAll("_", " ")}</span>;
};

export default ClaimStatusBadge;
