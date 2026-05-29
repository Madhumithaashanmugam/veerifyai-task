import ControllerSearch from "../components/financeController/ControllerSearch";
import ControllerStats from "../components/financeController/ControllerStats";
import EmptyState from "../components/financeController/EmptyState";
import FinalizationTable from "../components/financeController/FinalizationTable";
import FinalizedArchive from "../components/financeController/FinalizedArchive";
import { useFinanceController } from "../hooks/useFinanceController";
import "../styles/financeController.css";

const FinanceController = () => {
  const {
    activeTab,
    search,
    popup,
    approvedClaimsCount,
    finalizedClaimsCount,
    pendingAmount,
    finalizedAmount,
    averageTicket,
    filteredApproved,
    filteredFinalized,
    setSearch,
    setActiveTab,
    onFinalize,
    closePopup,
  } = useFinanceController();

  return (
    <div className="finance-controller-page">
      <div className="controller-hero">
        <div>
          <h1>Finance Controller Workspace</h1>
          <p>
            Review approved claims and finalize expenses for general ledger
            booking. Only claims with an approved status are available in the
            queue.
          </p>
        </div>
        <ControllerSearch search={search} onSearchChange={setSearch} />
      </div>

      <ControllerStats
        awaitingCount={approvedClaimsCount}
        finalizedCount={finalizedClaimsCount}
        avgTicket={averageTicket}
        pendingAmount={pendingAmount}
        finalizedAmount={finalizedAmount}
      />

      <div className="controller-tabs">
        <button
          className={`controller-tab ${activeTab === "queue" ? "active" : ""}`}
          onClick={() => setActiveTab("queue")}
        >
          Approval queue ({approvedClaimsCount})
        </button>
        <button
          className={`controller-tab ${activeTab === "archive" ? "active" : ""}`}
          onClick={() => setActiveTab("archive")}
        >
          Finalized archive ({finalizedClaimsCount})
        </button>
      </div>

      {activeTab === "queue" ? (
        filteredApproved.length ? (
          <FinalizationTable claims={filteredApproved} onFinalize={onFinalize} />
        ) : (
          <EmptyState message="No approved claims found. Try expanding the search or wait for reviewer approvals." />
        )
      ) : filteredFinalized.length ? (
        <FinalizedArchive claims={filteredFinalized} />
      ) : (
        <EmptyState message="No finalized claims yet. Finalized claims appear here after approval." />
      )}

      {popup?.isOpen && (
        <div className={`popup-message ${popup.type}`}>
          <strong>{popup.title}</strong>
          <p>{popup.message}</p>
          <button className="popup-close" onClick={closePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FinanceController;