import "../styles/employee.css";

import { useMemo, useState } from "react";

import {
  Plus,
  Search,
  FilePenLine,
  AlertCircle,
  CheckCircle2,
  Paperclip,
  MessageSquare,
  Plane,
} from "lucide-react";

interface Claim {
  id: string;
  title: string;
  description: string;
  amount: number;
  evidence: number;
  status:
    | "DRAFT"
    | "SUBMITTED"
    | "CHANGES_REQUESTED"
    | "APPROVED";
}

const Employee = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const claims: Claim[] = [
    {
      id: "EXP-2001",
      title: "Untitled claim",
      description: "No description",
      amount: 0,
      evidence: 0,
      status: "DRAFT",
    },
    {
      id: "EXP-1001",
      title: "Untitled claim",
      description: "No description",
      amount: 0,
      evidence: 0,
      status: "DRAFT",
    },
    {
      id: "EXP-1002",
      title: "Client dinner — Acme Corp",
      description:
        "Dinner with Acme procurement team to discuss Q3 renewal.",
      amount: 425.5,
      evidence: 1,
      status: "SUBMITTED",
    },
    {
      id: "EXP-1005",
      title: "Taxi — client visit",
      description:
        "Round-trip taxi to client office.",
      amount: 56,
      evidence: 1,
      status: "CHANGES_REQUESTED",
    },
  ];

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesSearch =
        claim.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        claim.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        claim.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const draftCount = claims.filter(
    (c) => c.status === "DRAFT"
  ).length;

  const actionRequiredCount = claims.filter(
    (c) => c.status === "CHANGES_REQUESTED"
  ).length;

  const reviewCount = claims.filter(
    (c) =>
      c.status === "SUBMITTED" ||
      c.status === "APPROVED"
  ).length;

  const completedCount = claims.filter(
    (c) => c.status === "APPROVED"
  ).length;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "draft";

      case "SUBMITTED":
        return "submitted";

      case "CHANGES_REQUESTED":
        return "changes";

      case "APPROVED":
        return "approved";

      default:
        return "";
    }
  };

  return (
    <div className="employee-page">
      {/* TOPBAR */}

      <div className="topbar">
        <div className="topbar-left">
          <div className="brand">
            Atlas Compliance
          </div>

          <span>/</span>

          <p>Employee</p>
        </div>

        <div className="topbar-right">
          <p>Alice Chen</p>

          <span>•</span>

          <p>E-001</p>

          <button className="switch-btn">
            Switch role
          </button>
        </div>
      </div>

      <div className="employee-wrapper">
        {/* HERO */}

        <div className="hero-section">
          <div>
            <p className="hero-tag">
              MY EXPENSE CLAIMS
            </p>

            <h1>Welcome back, Alice</h1>

            <p className="hero-description">
              Manage drafts, respond to reviewer
              feedback, and track your submissions.
            </p>
          </div>

          <button className="new-claim-btn">
            <Plus size={16} />
            New claim
          </button>
        </div>

        {/* SUMMARY */}

        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-top">
              <p>DRAFTS</p>

              <FilePenLine size={15} />
            </div>

            <h2>{draftCount}</h2>
          </div>

          <div className="summary-card">
            <div className="summary-top orange">
              <p>ACTION REQUIRED</p>

              <AlertCircle size={15} />
            </div>

            <h2>{actionRequiredCount}</h2>
          </div>

          <div className="summary-card">
            <div className="summary-top blue">
              <p>IN REVIEW</p>

              <Plane size={15} />
            </div>

            <h2>{reviewCount}</h2>
          </div>

          <div className="summary-card">
            <div className="summary-top green">
              <p>COMPLETED</p>

              <CheckCircle2 size={15} />
            </div>

            <h2>{completedCount}</h2>
          </div>
        </div>

        {/* ACTION REQUIRED */}

        <div className="section">
          <div className="section-title">
            <h3>Action required</h3>

            <p>
              Reviewer requested changes —
              respond to keep moving.
            </p>
          </div>

          <div className="claim-card">
            <div className="claim-card-top">
              <p className="claim-id">
                EXP-1005
              </p>

              <span className="status-badge changes">
                CHANGES REQUESTED
              </span>
            </div>

            <h4>Taxi — client visit</h4>

            <p className="claim-description">
              Round-trip taxi to client office.
            </p>

            <div className="claim-footer">
              <h2>$56.00</h2>

              <div className="claim-meta">
                <div>
                  <Paperclip size={14} />
                  1
                </div>

                <MessageSquare size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* DRAFT TABLE */}

        <div className="section">
          <div className="section-title">
            <h3>Drafts</h3>

            <p>
              Continue editing, attach evidence
              and submit when ready.
            </p>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>CLAIM</th>
                  <th>PURPOSE</th>
                  <th>AMOUNT</th>
                  <th>EVIDENCE</th>
                  <th>UPDATED</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {claims
                  .filter(
                    (claim) =>
                      claim.status === "DRAFT"
                  )
                  .map((claim) => (
                    <tr key={claim.id}>
                      <td>{claim.id}</td>

                      <td className="italic-cell">
                        Untitled
                      </td>

                      <td>
                        $
                        {claim.amount.toFixed(2)}
                      </td>

                      <td>
                        {claim.evidence} files
                      </td>

                      <td>5/29/2026</td>

                      <td>
                        <div className="table-actions">
                          <button className="open-btn">
                            Open
                          </button>

                          <button className="submit-btn">
                            Submit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ALL CLAIMS */}

        <div className="section">
          <div className="section-title">
            <h3>All my claims</h3>

            <p>
              Full history across every workflow
              stage.
            </p>
          </div>

          <div className="filters">
            <div className="search-box">
              <Search size={16} />

              <input
                type="text"
                placeholder="Search by claim ID or purpose..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="ALL">
                All statuses
              </option>

              <option value="DRAFT">
                DRAFT
              </option>

              <option value="SUBMITTED">
                SUBMITTED
              </option>

              <option value="CHANGES_REQUESTED">
                CHANGES REQUESTED
              </option>

              <option value="APPROVED">
                APPROVED
              </option>
            </select>
          </div>

          <div className="claims-grid">
            {filteredClaims.map((claim) => (
              <div
                className="claim-card"
                key={claim.id}
              >
                <div className="claim-card-top">
                  <p className="claim-id">
                    {claim.id}
                  </p>

                  <span
                    className={`status-badge ${getStatusClass(
                      claim.status
                    )}`}
                  >
                    {claim.status.replaceAll(
                      "_",
                      " "
                    )}
                  </span>
                </div>

                <h4>{claim.title}</h4>

                <p className="claim-description">
                  {claim.description}
                </p>

                <div className="claim-footer">
                  <h2>
                    $
                    {claim.amount.toFixed(2)}
                  </h2>

                  <div className="claim-meta">
                    <div>
                      <Paperclip size={14} />
                      {claim.evidence}
                    </div>

                    <MessageSquare size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;