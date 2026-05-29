import "../styles/employee.css";

import EmployeeHeader from "../components/employee/EmployeeHeader";
import EmployeeHero from "../components/employee/EmployeeHero";
import SummaryCards from "../components/employee/SummaryCards";
// import ActionRequiredCard from "../components/employee/ActionRequiredCard";
import DraftClaimsTable from "../components/employee/DraftClaimsTable";
import ClaimsFilters from "../components/employee/ClaimsFilters";
import ClaimsGrid from "../components/employee/ClaimsGrid";
import EmployeeForm from "../components/employee/EmployeeForm";
import SuccessPopup from "../components/popups/SuccessPopup";
import ErrorPopup from "../components/popups/ErrorPopup";
import { useEmployeeClaims } from "../hooks/useEmployeeClaims";

const Employee = () => {
  const {
    filteredClaims,
    draftClaims,
    popup,
    formData,
    isFormOpen,
    editingClaimId,
    search,
    statusFilter,
    draftCount,
    actionRequiredCount,
    reviewCount,
    completedCount,
    handleNewClaim,
    handleOpenClaim,
    handleCloseForm,
    handleInputChange,
    handleFileChange,
    handleSaveDraft,
    handleSubmitForReview,
    handleSubmitDraftRow,
    setSearch,
    setStatusFilter,
    closePopup,
  } = useEmployeeClaims();

  return (
    <div className="employee-page">
      <EmployeeHeader />

      <div className="employee-wrapper">
        <EmployeeHero onNewClaim={handleNewClaim} />

        <SummaryCards
          draftCount={draftCount}
          actionRequiredCount={actionRequiredCount}
          reviewCount={reviewCount}
          completedCount={completedCount}
        />

        {/* <ActionRequiredCard /> */}

        <DraftClaimsTable
          draftClaims={draftClaims}
          onOpenClaim={handleOpenClaim}
          onSubmitDraft={handleSubmitDraftRow}
        />

        <div className="section">
          <div className="section-title">
            <h3>All my claims</h3>
            <p>Full history across every workflow stage.</p>
          </div>

          <ClaimsFilters
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
          />
        </div>

        <ClaimsGrid claims={filteredClaims} onOpenClaim={handleOpenClaim} />
      </div>

      <EmployeeForm
        isOpen={isFormOpen}
        formData={formData}
        editingClaimId={editingClaimId}
        onClose={handleCloseForm}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSaveDraft={handleSaveDraft}
        onSubmitReview={handleSubmitForReview}
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

export default Employee;
