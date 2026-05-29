import "../styles/reviewer.css";

import ReviewerHeader from "../components/reviewer/ReviewerHeader";
import ReviewerSidebar from "../components/reviewer/ReviewerSidebar";
import ReviewStats from "../components/reviewer/ReviewStats";
import EvidenceValidation from "../components/reviewer/EvidenceValidation";
import ReviewDecision from "../components/reviewer/ReviewDecision";
import WorkflowOwnership from "../components/reviewer/WorkflowOwnership";
import ReviewerReminders from "../components/reviewer/ReviewerReminders";
import AuditTimeline from "../components/reviewer/AuditTimeline";
import ReviewerRemarksModal from "../components/reviewer/ReviewerRemarksModal";
import SuccessPopup from "../components/popups/SuccessPopup";
import ErrorPopup from "../components/popups/ErrorPopup";
import { useReviewerClaims } from "../hooks/useReviewerClaims";

const FinanceReviewer = () => {
  const {
    selectedClaim,
    queue,
    reviewStats,
    reviewer,
    search,
    popup,
    remarksOpen,
    currentAction,
    onSearchChange,
    onSelectClaim,
    onApprove,
    onRequestChanges,
    onReject,
    onCloseRemarks,
    onSaveRemarks,
    closePopup,
  } = useReviewerClaims();

  return (
    <div className="reviewer-page">
      <ReviewerHeader reviewer={reviewer} />

      <div className="reviewer-body">
        <section className="reviewer-left-panel">
          <ReviewStats stats={reviewStats} />

          <ReviewerSidebar
            queue={queue}
            selectedClaimId={selectedClaim?.id}
            search={search}
            onSearchChange={onSearchChange}
            onSelectClaim={onSelectClaim}
          />
        </section>

        <section className="reviewer-center-panel">
          <div className="reviewer-card reviewer-detail-card">
            <div className="reviewer-detail-header">
              <div>
                <p className="eyebrow">
                  Claim details
                </p>

                <h2>
                  {selectedClaim?.title ||
                    "Select a claim from the queue"}
                </h2>

                {selectedClaim && (
                  <p className="subtitle">
                    {selectedClaim.id} •{" "}
                    {selectedClaim.employeeName}
                  </p>
                )}
              </div>

              {selectedClaim && (
                <span className="status-badge large">
                  {selectedClaim.status.replaceAll(
                    "_",
                    " "
                  )}
                </span>
              )}
            </div>

            {selectedClaim ? (
              <>
                <div className="claim-summary-grid">
                  <div className="claim-summary-card">
                    <p>Amount</p>

                    <h3>
                      $
                      {selectedClaim.amount.toFixed(
                        2
                      )}
                    </h3>
                  </div>

                  <div className="claim-summary-card">
                    <p>Category</p>

                    <h3>
                      {selectedClaim.category}
                    </h3>
                  </div>

                  <div className="claim-summary-card">
                    <p>Date</p>

                    <h3>
                      {selectedClaim.date || "—"}
                    </h3>
                  </div>
                </div>

                <div className="claim-description-card">
                  <h4>Description</h4>

                  <p>
                    {selectedClaim.description}
                  </p>
                </div>

                <EvidenceValidation
                  claim={selectedClaim}
                />

                <ReviewDecision
                  claim={selectedClaim}
                  onApprove={onApprove}
                  onRequestChanges={
                    onRequestChanges
                  }
                  onReject={onReject}
                />

                <AuditTimeline
                  items={
                    selectedClaim.auditTimeline || []
                  }
                />
              </>
            ) : (
              <div className="empty-state">
                <p>
                  No reviewer task selected.
                </p>

                <small>
                  Use the search queue to pick a
                  claim.
                </small>
              </div>
            )}
          </div>
        </section>

        <aside className="reviewer-right-panel">
          <WorkflowOwnership
            status={selectedClaim?.status}
          />

          <ReviewerReminders
            claim={selectedClaim}
          />
        </aside>
      </div>

      <ReviewerRemarksModal
        open={remarksOpen}
        action={currentAction}
        onClose={onCloseRemarks}
        onSave={onSaveRemarks}
      />

      {popup?.type === "success" && (
        <SuccessPopup
          isOpen={popup.isOpen}
          title={popup.title}
          message={popup.message}
          onClose={closePopup}
        />
      )}

      {popup?.type === "error" && (
        <ErrorPopup
          isOpen={popup.isOpen}
          title={popup.title}
          message={popup.message}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default FinanceReviewer;