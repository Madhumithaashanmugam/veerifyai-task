interface ReviewStatsProps {
  stats: {
    submitted: number;
    resubmitted: number;
    riskFlagged: number;
  };
}

const ReviewStats = ({ stats }: ReviewStatsProps) => {
  return (
    <div className="review-stats">
      <div className="stat-card">
        <p>Submitted</p>
        <strong>{stats.submitted}</strong>
      </div>

      <div className="stat-card">
        <p>Resubmitted</p>
        <strong>{stats.resubmitted}</strong>
      </div>

      <div className="stat-card">
        <p>Risk flagged</p>
        <strong>{stats.riskFlagged}</strong>
      </div>
    </div>
  );
};

export default ReviewStats;
