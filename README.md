# ExpenseFlow

ExpenseFlow is an enterprise expense compliance workflow application built with React, TypeScript, and Vite. It provides dedicated dashboards for Employees, Finance Reviewers, and Finance Controllers, and persists claims in browser localStorage while tracking audit history and evidence validation.

## Features

- Role-based dashboards for Employee, Finance Reviewer, and Finance Controller
- Employee claim creation and draft management
- Evidence upload and validation
- Reviewer approval workflow with request changes and rejection support
- Risk detection for missing or duplicate evidence
- Audit timeline tracking for claim lifecycle events
- Finance Controller finalization of approved claims
- Dynamic workflow transitions across claim states
- localStorage persistence for claim state
- Responsive UI layout
- TypeScript support throughout the application

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- localStorage
- Lucide React
- React Router

## Workflow Overview

ExpenseFlow models an expense approval lifecycle across three roles:

1. Employee creates and manages claims
2. Finance Reviewer validates evidence and decides claim disposition
3. Finance Controller finalizes approved claims into a read-only archive

Supported claim statuses:

- `DRAFT`
- `SUBMITTED`
- `CHANGES_REQUESTED`
- `RESUBMITTED`
- `APPROVED`
- `FINALIZED`
- `REJECTED`
- `RISK_FLAGGED`

### Claim lifecycle

- Employees save drafts or submit claims for review.
- Reviewers assess evidence, approve claims, request changes, reject claims, or flag risk.
- Requested change claims are edited and resubmitted by employees.
- Approved claims are available to Finance Controllers for finalization.
- Finalized and rejected claims are locked as terminal workflow states.

## Folder Structure

```text
src/
  App.tsx
  main.tsx
  index.css
  App.css
  assets/
  component/
    WorkspaceCard.tsx
  components/
    ClaimDetailsPanel.tsx
    ConfirmActionModal.tsx
    EvidenceList.tsx
    RoleBasedActionPanel.tsx
    StatusBadge.tsx
    ValidationWarningBox.tsx
    employee/
      AuditTimeline.tsx
      ClaimCard.tsx
      ClaimsFilters.tsx
      ClaimsGrid.tsx
      ClaimStatusBadge.tsx
      DraftClaimsTable.tsx
      EmployeeForm.tsx
      EmployeeHeader.tsx
      EmployeeHero.tsx
      SummaryCards.tsx
    reviewer/
      AuditTimeline.tsx
      ClaimStatusBadge.tsx
      EvidenceValidation.tsx
      ReviewDecision.tsx
      ReviewerClaimCard.tsx
      ReviewerHeader.tsx
      ReviewerRemarksModal.tsx
      ReviewerReminders.tsx
      ReviewerSidebar.tsx
      ReviewStats.tsx
      SearchQueue.tsx
      WorkflowOwnership.tsx
    financeController/
      ControllerSearch.tsx
      ControllerStats.tsx
      EmptyState.tsx
      FinalizationTable.tsx
      FinalizeButton.tsx
      FinalizedArchive.tsx
      StatusBadge.tsx
  constants/
    employeeConstants.ts
  hooks/
    useEmployeeClaims.ts
    useFinanceController.ts
    useReviewerClaims.ts
  types/
    claim.ts
    reviewer.ts
  utils/
    claimHelpers.ts
    dateHelpers.ts
    financeControllerHelpers.ts
    localStorage.ts
    reviewerHelpers.ts
    reviewerStorage.ts
  pages/
    Home.tsx
    Employee.tsx
    FinanceReviewer.tsx
    FinanceController.tsx
  redux/
    workspaceSlice.ts
  store/
    store.ts
  styles/
    home.css
    employee.css
    reviewer.css
    financeController.css
```

### Folder explanation

- `pages/` contains the main role-based page screens.
- `components/` contains reusable UI components and role-specific component sets.
- `hooks/` contains page-specific state and business logic hooks.
- `utils/` contains claim helpers, storage helpers, and workflow utilities.
- `styles/` contains CSS used by page layouts and components.
- `types/` defines the shared claim and audit data models.
- `redux/` and `store/` are present for optional state management and are currently unused boilerplate.

## Role-Based Access

### Employee

Employees can:

- Create and edit expense claim drafts
- Attach receipt evidence
- Save drafts for later
- Submit claims for reviewer assessment
- Edit claims when status is `DRAFT` or `CHANGES_REQUESTED`

### Finance Reviewer

Reviewers can:

- Search and select submitted claims
- Validate evidence attachments
- Approve claims
- Request changes with remarks
- Reject claims with reason
- Flag claims as high-risk or duplicate evidence
- View audit history for each claim

### Finance Controller

Controllers can:

- Search approved claims
- Finalize approved claims
- Review finalized claim archive
- View summary metrics for pending and finalized claims

## Validation Rules

- Amount must be greater than zero
- Required fields include title, description, amount, date, and evidence for submission
- Evidence is enforced before submitting a claim
- Reviewers cannot approve claims without sufficient evidence
- Only approved claims can be finalized
- Terminal states (`FINALIZED`, `REJECTED`) are treated as locked workflow outcomes

## Audit Timeline

Each claim tracks an audit timeline of workflow actions. Audit entries store:

- action type
- source status
- destination status
- user role
- timestamp
- optional reviewer remarks

Audit history is displayed on claim details and reviewer views to document the full review path.

## Risk Detection

ExpenseFlow detects risk using:

- missing evidence
- duplicate receipt references across claims
- high-risk workflow conditions triggered during review

When a claim meets risk criteria, it is marked as `RISK_FLAGGED` and highlighted for reviewer attention.

## localStorage Persistence

- Claims are persisted under the browser storage key `expense_claims`
- On first run, the app seeds a set of mock claims representing multiple workflow states
- All user actions update persisted claims so state survives refreshes
- The app normalizes stored data and preserves audit timelines across sessions

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Future Improvements

- Add backend APIs for authenticated claim persistence
- Add authentication and role-based access control
- Replace localStorage with a database backend
- Support file uploads and secure file storage
- Add in-app notifications for workflow updates
- Add analytics and reporting dashboards
- Add unit and integration tests

## Screenshots
![alt text](image.png)

- Employee dashboard
![alt text](image-1.png)
![alt text](image-2.png)
- Reviewer dashboard
![alt text](image-3.png)
- Controller dashboard
![alt text](image-4.png)
![alt text](image-5.png)

deployed version on : https://veerifyai-task.pages.dev/ 

## Author

Madhumitha Shanmugam
