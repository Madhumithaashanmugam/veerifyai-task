import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWorkspace } from "../redux/workspaceSlice";

interface Props {
  title: string;
  subtitle: string;
  description: string;
  permissions: string[];
  workflow: string[];
  route: string;
}

const WorkspaceCard = ({
  title,
  subtitle,
  description,
  permissions,
  workflow,
  route,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setWorkspace(title));
    navigate(route);
  };

  return (
    <div className="workspace-card">
      <div className="icon-box">◉</div>

      <p className="workspace-subtitle">{subtitle}</p>

      <h2>{title}</h2>

      <p className="workspace-description">{description}</p>

      <div className="section">
        <h4>PERMISSIONS</h4>

        <ul>
          {permissions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h4>WORKFLOW SCOPE</h4>

        <ul>
          {workflow.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="workspace-footer" onClick={handleNavigate}>
        <span>Enter workspace</span>
        <span>→</span>
      </div>
    </div>
  );
};

export default WorkspaceCard;