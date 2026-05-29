import type { ClaimStatus } from "../../types/claim";
import { getWorkflowOwner } from "../../utils/reviewerHelpers";

interface WorkflowOwnershipProps {
  status?: ClaimStatus;
}

const WorkflowOwnership = ({ status }: WorkflowOwnershipProps) => {
  return (
    <div className="workflow-ownership reviewer-card">
      <div className="section-title">
        <p>Workflow ownership</p>
      </div>
      <div className="details">
        <p>{status ? getWorkflowOwner(status) : "No claim selected"}</p>
      </div>
    </div>
  );
};

export default WorkflowOwnership;
