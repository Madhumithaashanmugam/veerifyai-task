import type { AuditItem } from "../../types/reviewer";

interface AuditTimelineProps {
  items?: AuditItem[];
}

const formatAuditDate = (value: string): string => {
  if (!value) {
    return "Unknown date";
  }

  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const AuditTimeline = ({
  items = [],
}: AuditTimelineProps) => {
  return (
    <div className="audit-section">
      <p className="audit-title">
        Audit timeline
      </p>

      {items.length > 0 ? (
        items.map((item) => (
          <div
            className="audit-item"
            key={item.id}
          >
            <span>
              {formatAuditDate(item.timestamp)}
            </span>

            <p>
              {item.user} • {item.role}
            </p>

            <small>
              {item.action}

              {item.fromStatus &&
              item.toStatus
                ? ` • ${item.fromStatus.replaceAll(
                    "_",
                    " "
                  )} → ${item.toStatus.replaceAll(
                    "_",
                    " "
                  )}`
                : ""}
            </small>

            {item.remarks && (
              <p>{item.remarks}</p>
            )}
          </div>
        ))
      ) : (
        <div className="audit-item">
          <span>
            {formatAuditDate(
              new Date().toISOString()
            )}
          </span>

          <small>
            No audit history yet.
          </small>
        </div>
      )}
    </div>
  );
};

export default AuditTimeline;