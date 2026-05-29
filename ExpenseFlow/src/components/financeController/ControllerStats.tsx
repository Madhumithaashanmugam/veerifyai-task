interface ControllerStatsProps {
  awaitingCount: number;
  finalizedCount: number;
  avgTicket: number;
  pendingAmount: number;
  finalizedAmount: number;
}

const ControllerStats = ({
  awaitingCount,
  finalizedCount,
  avgTicket,
  pendingAmount,
  finalizedAmount,
}: ControllerStatsProps) => {
  return (
    <div className="controller-stats">
      <div className="controller-card">
        <p>Awaiting finalization</p>
        <h3>{awaitingCount}</h3>
        <small>${pendingAmount.toFixed(2)} pending</small>
      </div>

      <div className="controller-card">
        <p>Finalized to date</p>
        <h3>{finalizedCount}</h3>
        <small>${finalizedAmount.toFixed(2)} finalized</small>
      </div>

      <div className="controller-card">
        <p>Avg ticket size</p>
        <h3>${avgTicket.toFixed(2)}</h3>
        <small>Approved queue average</small>
      </div>
    </div>
  );
};

export default ControllerStats;
