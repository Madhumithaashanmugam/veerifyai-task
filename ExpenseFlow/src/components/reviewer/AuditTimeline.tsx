import type { AuditItem } from "../../types/reviewer";

interface AuditTimelineProps {
  items: AuditItem[];
}

const formatTime = (timestamp: string) => {
  if (!timestamp) {
    return "Unknown date";
  }

  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const AuditTimeline = ({ items }: AuditTimelineProps) => {
  return (
    <div className="audit-timeline reviewer-card">
      <div className="section-title">
        <p>Audit timeline</p>
      </div>
      {items.length ? (
        items.map((item) => (
          <div className="timeline-item" key={item.id}>
            <div className="timeline-meta">
              <span>{formatTime(item.timestamp)}</span>
              <span>{item.role}</span>
            </div>
            <h4>{item.action}</h4>
            <p>
              {item.user} {item.remarks ? `• ${item.remarks}` : ""}
            </p>
            {item.fromStatus && item.toStatus && (
              <small>
                {item.fromStatus.replaceAll("_", " ")} → {item.toStatus.replaceAll("_", " ")}
              </small>
            )}
          </div>
        ))
      ) : (
        <div className="workflow-ownership details">
          <p>No audit history yet.</p>
        </div>
      )}
    </div>
  );
};

export default AuditTimeline;
