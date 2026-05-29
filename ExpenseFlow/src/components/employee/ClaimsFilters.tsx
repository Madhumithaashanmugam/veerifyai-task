import { Search } from "lucide-react";
import type { ClaimStatus } from "../../types/claim";

interface ClaimsFiltersProps {
  search: string;
  statusFilter: ClaimStatus | "ALL";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ClaimStatus | "ALL") => void;
}

const ClaimsFilters = ({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: ClaimsFiltersProps) => {
  return (
    <div className="filters">
      <div className="search-box">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search by claim ID or purpose..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusChange(e.target.value as ClaimStatus | "ALL")
        }
      >
        <option value="ALL">All statuses</option>
        <option value="DRAFT">DRAFT</option>
        <option value="SUBMITTED">SUBMITTED</option>
        <option value="RESUBMITTED">RESUBMITTED</option>
        <option value="CHANGES_REQUESTED">CHANGES REQUESTED</option>
        <option value="RISK_FLAGGED">RISK FLAGGED</option>
        <option value="APPROVED">APPROVED</option>
        <option value="FINALIZED">FINALIZED</option>
      </select>
    </div>
  );
};

export default ClaimsFilters;
