interface SearchQueueProps {
  search: string;
  onSearchChange: (value: string) => void;
  submittedCount: number;
  resubmittedCount: number;
  riskCount: number;
}

const SearchQueue = ({
  search,
  onSearchChange,
  submittedCount,
  resubmittedCount,
  riskCount,
}: SearchQueueProps) => {
  return (
    <div className="search-queue">
      <h4>Search queue</h4>
      <input
        type="text"
        placeholder="Search by claim, employee, or title"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <div className="search-metrics">
        <div className="metric-card">
          <p>Submitted</p>
          <strong>{submittedCount}</strong>
        </div>
        <div className="metric-card">
          <p>Resubmitted</p>
          <strong>{resubmittedCount}</strong>
        </div>
        <div className="metric-card">
          <p>Risk flagged</p>
          <strong>{riskCount}</strong>
        </div>
      </div>
    </div>
  );
};

export default SearchQueue;
