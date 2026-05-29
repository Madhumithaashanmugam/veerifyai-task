
import "../styles/home.css";

import { useNavigate } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="header">
          <p className="platform-title">
            ATLAS COMPLIANCE PLATFORM
          </p>

          <h1>Sign in to your compliance workspace</h1>

          <p className="header-description">
            Each role has a dedicated operational dashboard with
            its own permissions, workflow stages and visible claims.
          </p>
        </div>

        <div className="workspace-grid">
          {/* EMPLOYEE */}

          <div className="workspace-card">
            <div>
              <div className="workspace-top">
                <div className="icon-box employee-icon">
                  <FiUser />
                </div>

                <p className="workspace-subtitle">
                  SUBMISSION WORKSPACE
                </p>
              </div>

              <h2 className="workspace-title">Employee</h2>

              <p className="workspace-description">
                Create, edit and submit your own expense claims
                with supporting evidence.
              </p>

              <div className="section">
                <p className="section-title">PERMISSIONS</p>

                <ul className="section-list">
                  <li>Create claims</li>
                  <li>Edit drafts</li>
                  <li>Upload evidence</li>
                  <li>Resubmit changes</li>
                </ul>
              </div>

              <div className="section">
                <p className="section-title">WORKFLOW SCOPE</p>

                <ul className="section-list workflow-list">
                  <li>Maintain accurate records</li>
                  <li>Attach valid receipts</li>
                  <li>Respond to reviewer feedback</li>
                </ul>
              </div>
            </div>

            <div className="workspace-footer">
              <button
                className="workspace-button"
                onClick={() => navigate("/employee")}
              >
                <span>Enter workspace</span>

                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* REVIEWER */}

          <div className="workspace-card">
            <div>
              <div className="workspace-top">
                <div className="icon-box reviewer-icon">
                  <HiOutlineShieldCheck />
                </div>

                <p className="workspace-subtitle">
                  COMPLIANCE REVIEW STATION
                </p>
              </div>

              <h2 className="workspace-title">
                Finance Reviewer
              </h2>

              <p className="workspace-description">
                Validate evidence, flag risks, and decide on
                submitted claims across the org.
              </p>

              <div className="section">
                <p className="section-title">PERMISSIONS</p>

                <ul className="section-list">
                  <li>Approve claims</li>
                  <li>Request changes</li>
                  <li>Reject claims</li>
                  <li>Flag duplicates</li>
                </ul>
              </div>

              <div className="section">
                <p className="section-title">WORKFLOW SCOPE</p>

                <ul className="section-list workflow-list">
                  <li>Verify evidence sufficiency</li>
                  <li>Detect policy violations</li>
                  <li>Document review decisions</li>
                </ul>
              </div>
            </div>

            <div className="workspace-footer">
              <button
                className="workspace-button"
                onClick={() =>
                  navigate("/finance-reviewer")
                }
              >
                <span>Enter workspace</span>

                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* CONTROLLER */}

          <div className="workspace-card">
            <div>
              <div className="workspace-top">
                <div className="icon-box controller-icon">
                  <HiOutlineBuildingLibrary />
                </div>

                <p className="workspace-subtitle">
                  FINALIZATION & AUDIT CENTER
                </p>
              </div>

              <h2 className="workspace-title">
                Finance Controller
              </h2>

              <p className="workspace-description">
                Finalize approved claims into the ledger and
                monitor the compliance audit trail.
              </p>

              <div className="section">
                <p className="section-title">PERMISSIONS</p>

                <ul className="section-list">
                  <li>Finalize approved claims</li>
                  <li>Audit full history</li>
                  <li>Lock terminal states</li>
                </ul>
              </div>

              <div className="section">
                <p className="section-title">WORKFLOW SCOPE</p>

                <ul className="section-list workflow-list">
                  <li>Maintain audit integrity</li>
                  <li>Book to general ledger</li>
                  <li>Enforce terminal locks</li>
                </ul>
              </div>
            </div>

            <div className="workspace-footer">
              <button
                className="workspace-button"
                onClick={() =>
                  navigate("/finance-controller")
                }
              >
                <span>Enter workspace</span>

                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

