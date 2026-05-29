import type { Claim, ClaimStatus } from "../types/claim";
import { appendAuditLog } from "./reviewerHelpers";

const STORAGE_KEY = "expense_claims";
const LEGACY_STORAGE_KEY = "employee_claims";

const parseClaims = (raw: string | null): Claim[] => {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const createAuditId = (): string => `AUD-${Math.floor(100000 + Math.random() * 900000)}`;

const createLegacyAuditTimeline = (
  claim: Partial<Claim>,
  createdAt: string
): Claim["auditTimeline"] => [
  {
    id: createAuditId(),
    action: claim.status === "SUBMITTED" ? "Submitted" : "Created draft",
    fromStatus: undefined,
    toStatus: claim.status as ClaimStatus,
    user: claim.employeeName || "Alice Chen",
    role: "Employee",
    timestamp: createdAt,
    remarks: claim.reviewerRemarks,
  },
];

const normalizeClaim = (claim: Partial<Claim>): Claim => {
  const createdAt = claim.createdAt || new Date().toISOString();
  const updatedAt = claim.updatedAt || createdAt;
  const status = claim.status || "DRAFT";

  return {
    id: claim.id || `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
    title: claim.title || "",
    description: claim.description || "",
    amount:
      typeof claim.amount === "number"
        ? claim.amount
        : Number(claim.amount) || 0,
    evidence:
      typeof claim.evidence === "number"
        ? claim.evidence
        : Number(claim.evidence) || 0,
    category: claim.category || "Travel",
    date: claim.date || "",
    receiptName: claim.receiptName || "",
    status,
    createdAt,
    updatedAt,
    employeeName: claim.employeeName || "Alice Chen",
    employeeId: claim.employeeId || "E-001",
    reviewerRemarks: claim.reviewerRemarks,
    auditTimeline:
      Array.isArray(claim.auditTimeline) && claim.auditTimeline.length > 0
        ? claim.auditTimeline
        : createLegacyAuditTimeline(claim, createdAt),
  };
};

const getMockClaims = (): Claim[] => {
  const now = new Date().toISOString();

  return [
    {
      id: "EXP-1001",
      title: "Travel booking for client meeting",
      description: "Booked airfare and hotel for the client site visit.",
      amount: 980,
      evidence: 1,
      category: "Travel",
      date: "2026-05-12",
      receiptName: "flight-receipt.pdf",
      status: "DRAFT",
      createdAt: now,
      updatedAt: now,
      employeeName: "Alice Chen",
      employeeId: "E-001",
      auditTimeline: [
        {
          id: "AUD-100001",
          action: "Created draft",
          user: "Alice Chen",
          role: "Employee",
          timestamp: now,
        },
      ],
    },
    {
      id: "EXP-1002",
      title: "Hotel reimbursement for conference",
      description: "Conference hotel stay with valid receipt attached.",
      amount: 650,
      evidence: 1,
      category: "Lodging",
      date: "2026-05-08",
      receiptName: "hotel-receipt.pdf",
      status: "SUBMITTED",
      createdAt: "2026-05-10T08:00:00.000Z",
      updatedAt: "2026-05-10T08:00:00.000Z",
      employeeName: "Alice Chen",
      employeeId: "E-001",
      auditTimeline: [
        {
          id: "AUD-100002",
          action: "Created draft",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-08T12:00:00.000Z",
        },
        {
          id: "AUD-100003",
          action: "Submitted claim",
          fromStatus: "DRAFT",
          toStatus: "SUBMITTED",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-10T08:00:00.000Z",
        },
      ],
    },
    {
      id: "EXP-1003",
      title: "Client dinner expense",
      description: "Dinner with client partner, receipt not attached yet.",
      amount: 120,
      evidence: 0,
      category: "Meals",
      date: "2026-05-09",
      receiptName: "",
      status: "SUBMITTED",
      createdAt: "2026-05-09T14:30:00.000Z",
      updatedAt: "2026-05-09T14:30:00.000Z",
      employeeName: "Alice Chen",
      employeeId: "E-001",
      auditTimeline: [
        {
          id: "AUD-100004",
          action: "Created draft",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-09T09:00:00.000Z",
        },
        {
          id: "AUD-100005",
          action: "Submitted claim",
          fromStatus: "DRAFT",
          toStatus: "SUBMITTED",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-09T14:30:00.000Z",
        },
      ],
    },
    {
      id: "EXP-1004",
      title: "Software subscription renewal",
      description: "Renewed licensed software after reviewer requested changes.",
      amount: 360,
      evidence: 1,
      category: "Software",
      date: "2026-05-06",
      receiptName: "software-receipt.pdf",
      status: "RESUBMITTED",
      createdAt: "2026-05-05T10:00:00.000Z",
      updatedAt: "2026-05-10T11:00:00.000Z",
      employeeName: "Morgan Price",
      employeeId: "E-002",
      reviewerRemarks: "Please attach vendor invoice to validate the purchase.",
      auditTimeline: [
        {
          id: "AUD-100006",
          action: "Created draft",
          user: "Morgan Price",
          role: "Employee",
          timestamp: "2026-05-05T10:00:00.000Z",
        },
        {
          id: "AUD-100007",
          action: "Submitted claim",
          fromStatus: "DRAFT",
          toStatus: "SUBMITTED",
          user: "Morgan Price",
          role: "Employee",
          timestamp: "2026-05-06T08:00:00.000Z",
        },
        {
          id: "AUD-100008",
          action: "Requested changes",
          fromStatus: "SUBMITTED",
          toStatus: "CHANGES_REQUESTED",
          user: "Jordan Lee",
          role: "Finance Reviewer",
          timestamp: "2026-05-07T16:00:00.000Z",
          remarks: "Vendor invoice missing, please attach.",
        },
        {
          id: "AUD-100009",
          action: "Resubmitted",
          fromStatus: "CHANGES_REQUESTED",
          toStatus: "RESUBMITTED",
          user: "Morgan Price",
          role: "Employee",
          timestamp: "2026-05-10T11:00:00.000Z",
        },
      ],
    },
    {
      id: "EXP-1005",
      title: "Client entertainment request",
      description: "Board requested change in expense description.",
      amount: 220,
      evidence: 1,
      category: "Meals",
      date: "2026-05-03",
      receiptName: "dinner-receipt.pdf",
      status: "CHANGES_REQUESTED",
      createdAt: "2026-05-03T09:00:00.000Z",
      updatedAt: "2026-05-04T15:00:00.000Z",
      employeeName: "Alice Chen",
      employeeId: "E-001",
      reviewerRemarks: "Please add itemized meal details before resubmitting.",
      auditTimeline: [
        {
          id: "AUD-100010",
          action: "Created draft",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-03T09:00:00.000Z",
        },
        {
          id: "AUD-100011",
          action: "Submitted claim",
          fromStatus: "DRAFT",
          toStatus: "SUBMITTED",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-03T13:00:00.000Z",
        },
        {
          id: "AUD-100012",
          action: "Requested changes",
          fromStatus: "SUBMITTED",
          toStatus: "CHANGES_REQUESTED",
          user: "Jordan Lee",
          role: "Finance Reviewer",
          timestamp: "2026-05-04T15:00:00.000Z",
          remarks: "Please add itemized meal details before resubmitting.",
        },
      ],
    },
    {
      id: "EXP-1006",
      title: "Office supplies purchase",
      description: "Stationery purchase approved by reviewer.",
      amount: 75,
      evidence: 1,
      category: "Office",
      date: "2026-05-02",
      receiptName: "stationery-receipt.pdf",
      status: "APPROVED",
      createdAt: "2026-05-02T09:30:00.000Z",
      updatedAt: "2026-05-06T10:30:00.000Z",
      employeeName: "Alice Chen",
      employeeId: "E-001",
      auditTimeline: [
        {
          id: "AUD-100013",
          action: "Created draft",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-02T09:30:00.000Z",
        },
        {
          id: "AUD-100014",
          action: "Submitted claim",
          fromStatus: "DRAFT",
          toStatus: "SUBMITTED",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-02T11:00:00.000Z",
        },
        {
          id: "AUD-100015",
          action: "Approved",
          fromStatus: "SUBMITTED",
          toStatus: "APPROVED",
          user: "Jordan Lee",
          role: "Finance Reviewer",
          timestamp: "2026-05-06T10:30:00.000Z",
        },
      ],
    },
    {
      id: "EXP-1007",
      title: "Consulting fees finalization",
      description: "Final approved expense ready for ledger posting.",
      amount: 1450,
      evidence: 1,
      category: "Professional Services",
      date: "2026-04-28",
      receiptName: "consulting-invoice.pdf",
      status: "FINALIZED",
      createdAt: "2026-04-28T10:10:00.000Z",
      updatedAt: "2026-05-12T14:40:00.000Z",
      employeeName: "Morgan Price",
      employeeId: "E-002",
      auditTimeline: [
        {
          id: "AUD-100016",
          action: "Created draft",
          user: "Morgan Price",
          role: "Employee",
          timestamp: "2026-04-28T10:10:00.000Z",
        },
        {
          id: "AUD-100017",
          action: "Submitted claim",
          fromStatus: "DRAFT",
          toStatus: "SUBMITTED",
          user: "Morgan Price",
          role: "Employee",
          timestamp: "2026-04-29T08:20:00.000Z",
        },
        {
          id: "AUD-100018",
          action: "Approved",
          fromStatus: "SUBMITTED",
          toStatus: "APPROVED",
          user: "Jordan Lee",
          role: "Finance Reviewer",
          timestamp: "2026-05-02T10:00:00.000Z",
        },
        {
          id: "AUD-100019",
          action: "Finalized",
          fromStatus: "APPROVED",
          toStatus: "FINALIZED",
          user: "Sam Okafor",
          role: "Finance Controller",
          timestamp: "2026-05-12T14:40:00.000Z",
        },
      ],
    },
    {
      id: "EXP-1008",
      title: "Conference travel rejected",
      description: "Reimbursement denied due to policy breach.",
      amount: 1310,
      evidence: 1,
      category: "Travel",
      date: "2026-05-01",
      receiptName: "conference-invoice.pdf",
      status: "REJECTED",
      createdAt: "2026-05-01T09:00:00.000Z",
      updatedAt: "2026-05-03T13:15:00.000Z",
      employeeName: "Alice Chen",
      employeeId: "E-001",
      reviewerRemarks: "Expense exceeds policy limits for non-client travel.",
      auditTimeline: [
        {
          id: "AUD-100020",
          action: "Created draft",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-01T09:00:00.000Z",
        },
        {
          id: "AUD-100021",
          action: "Submitted claim",
          fromStatus: "DRAFT",
          toStatus: "SUBMITTED",
          user: "Alice Chen",
          role: "Employee",
          timestamp: "2026-05-01T12:00:00.000Z",
        },
        {
          id: "AUD-100022",
          action: "Rejected",
          fromStatus: "SUBMITTED",
          toStatus: "REJECTED",
          user: "Jordan Lee",
          role: "Finance Reviewer",
          timestamp: "2026-05-03T13:15:00.000Z",
          remarks: "Expense exceeds policy limits for non-client travel.",
        },
      ],
    },
    {
      id: "EXP-1009",
      title: "Duplicate receipt evidence",
      description: "Claim uses a reused receipt from another expense.",
      amount: 420,
      evidence: 1,
      category: "Office",
      date: "2026-05-11",
      receiptName: "hotel-receipt.pdf",
      status: "RISK_FLAGGED",
      createdAt: "2026-05-11T09:45:00.000Z",
      updatedAt: "2026-05-11T09:45:00.000Z",
      employeeName: "Casey Nguyen",
      employeeId: "E-003",
      auditTimeline: [
        {
          id: "AUD-100023",
          action: "Created draft",
          user: "Casey Nguyen",
          role: "Employee",
          timestamp: "2026-05-11T09:45:00.000Z",
        },
        {
          id: "AUD-100024",
          action: "Submitted claim",
          fromStatus: "DRAFT",
          toStatus: "SUBMITTED",
          user: "Casey Nguyen",
          role: "Employee",
          timestamp: "2026-05-11T10:10:00.000Z",
        },
      ],
    },
  ];
};

const getRawClaims = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const current = window.localStorage.getItem(STORAGE_KEY);
  if (current) {
    return current;
  }

  return window.localStorage.getItem(LEGACY_STORAGE_KEY);
};

export const getClaims = (): Claim[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = getRawClaims();
  let claims = parseClaims(raw).map(normalizeClaim);

  if (!raw || claims.length === 0) {
    claims = getMockClaims().map(normalizeClaim);
    saveClaims(claims);
    return claims;
  }

  if (raw && !window.localStorage.getItem(STORAGE_KEY)) {
    saveClaims(claims);
  }

  return claims;
};

export const saveClaims = (claims: Claim[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
};

export const createClaim = (claim: Claim): Claim => {
  const existingClaims = getClaims();
  const claimExists = existingClaims.some((item) => item.id === claim.id);

  if (claimExists) {
    throw new Error(`Claim with id ${claim.id} already exists.`);
  }

  const updatedClaims = [...existingClaims, claim];
  saveClaims(updatedClaims);

  return claim;
};

export const updateClaim = (claim: Claim): Claim => {
  const existingClaims = getClaims();
  const updatedClaims = existingClaims.map((item) =>
    item.id === claim.id ? claim : item
  );

  saveClaims(updatedClaims);

  return claim;
};

export const submitClaim = (claimId: string): Claim | null => {
  const existingClaims = getClaims();
  const updatedClaims = existingClaims.map((item) => {
    if (item.id !== claimId) {
      return item;
    }

    const nextStatus: ClaimStatus =
      item.status === "CHANGES_REQUESTED" ? "RESUBMITTED" : "SUBMITTED";

    return appendAuditLog(
      {
        ...item,
        status: nextStatus,
      },
      nextStatus === "RESUBMITTED" ? "Resubmitted with updated invoice" : "Submitted claim",
      item.status,
      nextStatus,
      item.employeeName,
      "Employee"
    );
  });

  saveClaims(updatedClaims);

  return updatedClaims.find((item) => item.id === claimId) ?? null;
};
