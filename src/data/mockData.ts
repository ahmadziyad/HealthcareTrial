// Trials Data
export interface Trial {
  id: string;
  name: string;
  phase: string;
  status: "active" | "enrolling" | "completed" | "paused";
  progress: number;
  sites: number;
  enrolled: number;
  target: number;
  startDate: string;
  endDate?: string;
  sponsor: string;
  indication: string;
  protocol: string;
}

export const trials: Trial[] = [
  {
    id: "TRIAL-042",
    name: "Oncology Phase III - Immunotherapy",
    phase: "Phase III",
    status: "active",
    progress: 72,
    sites: 24,
    enrolled: 456,
    target: 630,
    startDate: "Mar 2024",
    sponsor: "Novartis",
    indication: "Non-Small Cell Lung Cancer",
    protocol: "PROTO-042-NSCLC",
  },
  {
    id: "TRIAL-038",
    name: "Cardiology Phase II - Heart Failure",
    phase: "Phase II",
    status: "enrolling",
    progress: 45,
    sites: 18,
    enrolled: 180,
    target: 400,
    startDate: "Jun 2024",
    sponsor: "Pfizer",
    indication: "Chronic Heart Failure",
    protocol: "PROTO-038-CHF",
  },
  {
    id: "TRIAL-051",
    name: "Neurology Phase I - Alzheimer's",
    phase: "Phase I",
    status: "active",
    progress: 88,
    sites: 8,
    enrolled: 44,
    target: 50,
    startDate: "Jan 2024",
    sponsor: "Biogen",
    indication: "Early-Stage Alzheimer's",
    protocol: "PROTO-051-ALZ",
  },
  {
    id: "TRIAL-035",
    name: "Endocrinology Phase II - Diabetes",
    phase: "Phase II",
    status: "paused",
    progress: 62,
    sites: 15,
    enrolled: 248,
    target: 400,
    startDate: "Feb 2024",
    sponsor: "Eli Lilly",
    indication: "Type 2 Diabetes",
    protocol: "PROTO-035-T2D",
  },
  {
    id: "TRIAL-059",
    name: "Rheumatology Phase III - Arthritis",
    phase: "Phase III",
    status: "enrolling",
    progress: 35,
    sites: 22,
    enrolled: 210,
    target: 600,
    startDate: "Aug 2024",
    sponsor: "AbbVie",
    indication: "Rheumatoid Arthritis",
    protocol: "PROTO-059-RA",
  },
  {
    id: "TRIAL-062",
    name: "Dermatology Phase II - Psoriasis",
    phase: "Phase II",
    status: "active",
    progress: 55,
    sites: 12,
    enrolled: 110,
    target: 200,
    startDate: "May 2024",
    sponsor: "Johnson & Johnson",
    indication: "Moderate-Severe Psoriasis",
    protocol: "PROTO-062-PSO",
  },
];

// Sites Data
export interface Site {
  id: string;
  name: string;
  location: string;
  status: "active" | "pending" | "issue" | "inactive";
  lastSync: string;
  enrolled: number;
  capacity: number;
  principalInvestigator: string;
  trials: string[];
}

export const sites: Site[] = [
  {
    id: "SITE-001",
    name: "Mayo Clinic",
    location: "Rochester, MN",
    status: "active",
    lastSync: "2 min ago",
    enrolled: 45,
    capacity: 60,
    principalInvestigator: "Dr. Sarah Chen",
    trials: ["TRIAL-042", "TRIAL-051"],
  },
  {
    id: "SITE-002",
    name: "Johns Hopkins",
    location: "Baltimore, MD",
    status: "active",
    lastSync: "5 min ago",
    enrolled: 38,
    capacity: 50,
    principalInvestigator: "Dr. Michael Torres",
    trials: ["TRIAL-042", "TRIAL-038"],
  },
  {
    id: "SITE-003",
    name: "Mass General",
    location: "Boston, MA",
    status: "pending",
    lastSync: "15 min ago",
    enrolled: 22,
    capacity: 40,
    principalInvestigator: "Dr. Emily Watson",
    trials: ["TRIAL-038"],
  },
  {
    id: "SITE-004",
    name: "Cleveland Clinic",
    location: "Cleveland, OH",
    status: "issue",
    lastSync: "1 hour ago",
    enrolled: 28,
    capacity: 35,
    principalInvestigator: "Dr. James Park",
    trials: ["TRIAL-035", "TRIAL-059"],
  },
  {
    id: "SITE-005",
    name: "Stanford Health",
    location: "Palo Alto, CA",
    status: "active",
    lastSync: "3 min ago",
    enrolled: 52,
    capacity: 70,
    principalInvestigator: "Dr. Lisa Huang",
    trials: ["TRIAL-042", "TRIAL-062"],
  },
  {
    id: "SITE-006",
    name: "UCLA Medical Center",
    location: "Los Angeles, CA",
    status: "active",
    lastSync: "1 min ago",
    enrolled: 41,
    capacity: 55,
    principalInvestigator: "Dr. Robert Kim",
    trials: ["TRIAL-051", "TRIAL-059"],
  },
  {
    id: "SITE-007",
    name: "Mount Sinai",
    location: "New York, NY",
    status: "active",
    lastSync: "4 min ago",
    enrolled: 35,
    capacity: 45,
    principalInvestigator: "Dr. Angela Martinez",
    trials: ["TRIAL-038", "TRIAL-062"],
  },
  {
    id: "SITE-008",
    name: "Duke University",
    location: "Durham, NC",
    status: "pending",
    lastSync: "20 min ago",
    enrolled: 18,
    capacity: 30,
    principalInvestigator: "Dr. William Chang",
    trials: ["TRIAL-035"],
  },
];

// Agents Data
export interface Agent {
  id: string;
  name: string;
  type: "A2A" | "MCP";
  status: "online" | "processing" | "offline" | "error";
  lastMessage: string;
  messagesProcessed: number;
  uptime: string;
  description: string;
  capabilities: string[];
}

export const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Data Validation Agent",
    type: "A2A",
    status: "online",
    lastMessage: "All CRF data validated for TRIAL-042",
    messagesProcessed: 1247,
    uptime: "99.9%",
    description: "Validates incoming clinical data against protocol specifications",
    capabilities: ["CRF Validation", "Data Quality Checks", "Anomaly Detection"],
  },
  {
    id: "agent-002",
    name: "Site Coordinator Agent",
    type: "A2A",
    status: "processing",
    lastMessage: "Processing enrollment update from SITE-003",
    messagesProcessed: 892,
    uptime: "99.7%",
    description: "Coordinates data sync and communication between trial sites",
    capabilities: ["Site Sync", "Enrollment Tracking", "Status Updates"],
  },
  {
    id: "agent-003",
    name: "Clinical Context Agent",
    type: "MCP",
    status: "online",
    lastMessage: "Protocol context loaded for Phase II trials",
    messagesProcessed: 456,
    uptime: "99.8%",
    description: "Provides clinical protocol context for AI-assisted decisions",
    capabilities: ["Protocol Context", "Medical Knowledge", "Decision Support"],
  },
  {
    id: "agent-004",
    name: "Regulatory Compliance Agent",
    type: "MCP",
    status: "online",
    lastMessage: "ICH-GCP guidelines updated in context",
    messagesProcessed: 328,
    uptime: "99.9%",
    description: "Ensures regulatory compliance across all trial operations",
    capabilities: ["ICH-GCP Compliance", "FDA Guidelines", "Audit Support"],
  },
  {
    id: "agent-005",
    name: "Safety Monitor Agent",
    type: "A2A",
    status: "online",
    lastMessage: "No adverse events flagged in last 24 hours",
    messagesProcessed: 654,
    uptime: "100%",
    description: "Real-time monitoring of safety signals and adverse events",
    capabilities: ["AE Detection", "Safety Signals", "Alert Generation"],
  },
  {
    id: "agent-006",
    name: "Document Processing Agent",
    type: "MCP",
    status: "offline",
    lastMessage: "Scheduled maintenance in progress",
    messagesProcessed: 1089,
    uptime: "98.5%",
    description: "Processes and indexes trial documentation",
    capabilities: ["Document Parsing", "OCR", "Content Extraction"],
  },
];

// Patients Data
export interface Patient {
  id: string;
  subjectId: string;
  site: string;
  trial: string;
  status: "screening" | "enrolled" | "active" | "completed" | "withdrawn";
  enrollmentDate: string;
  lastVisit: string;
  nextVisit: string;
  completionRate: number;
}

export const patients: Patient[] = [
  {
    id: "PAT-001",
    subjectId: "042-001-0001",
    site: "Mayo Clinic",
    trial: "TRIAL-042",
    status: "active",
    enrollmentDate: "Mar 15, 2024",
    lastVisit: "Dec 1, 2024",
    nextVisit: "Dec 15, 2024",
    completionRate: 75,
  },
  {
    id: "PAT-002",
    subjectId: "042-001-0002",
    site: "Mayo Clinic",
    trial: "TRIAL-042",
    status: "active",
    enrollmentDate: "Mar 22, 2024",
    lastVisit: "Dec 5, 2024",
    nextVisit: "Dec 19, 2024",
    completionRate: 70,
  },
  {
    id: "PAT-003",
    subjectId: "038-002-0001",
    site: "Johns Hopkins",
    trial: "TRIAL-038",
    status: "screening",
    enrollmentDate: "Dec 1, 2024",
    lastVisit: "Dec 10, 2024",
    nextVisit: "Dec 17, 2024",
    completionRate: 10,
  },
  {
    id: "PAT-004",
    subjectId: "051-005-0001",
    site: "Stanford Health",
    trial: "TRIAL-051",
    status: "completed",
    enrollmentDate: "Jan 10, 2024",
    lastVisit: "Nov 28, 2024",
    nextVisit: "-",
    completionRate: 100,
  },
  {
    id: "PAT-005",
    subjectId: "035-004-0001",
    site: "Cleveland Clinic",
    trial: "TRIAL-035",
    status: "withdrawn",
    enrollmentDate: "Feb 20, 2024",
    lastVisit: "Oct 15, 2024",
    nextVisit: "-",
    completionRate: 45,
  },
];

// Enrollment Chart Data
export const enrollmentData = [
  { month: "Jan", enrolled: 45, target: 50 },
  { month: "Feb", enrolled: 92, target: 100 },
  { month: "Mar", enrolled: 156, target: 150 },
  { month: "Apr", enrolled: 210, target: 200 },
  { month: "May", enrolled: 278, target: 250 },
  { month: "Jun", enrolled: 342, target: 300 },
  { month: "Jul", enrolled: 398, target: 350 },
  { month: "Aug", enrolled: 456, target: 400 },
];
