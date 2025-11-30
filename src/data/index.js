// Central data export for mock CRM API
import { customers } from './customers.js';
import { contacts } from './contacts.js';
import { opportunities } from './opportunities.js';
import { activities } from './activities.js';
import { products } from './products.js';
import { users } from './users.js';
import { tasks } from './tasks.js';
import { notes } from './notes.js';

export { customers } from './customers.js';
export { contacts } from './contacts.js';
export { opportunities } from './opportunities.js';
export { activities } from './activities.js';
export { products } from './products.js';
export { users } from './users.js';
export { tasks } from './tasks.js';
export { notes } from './notes.js';

// Aggregated statistics for dashboard/summary queries
export const statistics = {
  overview: {
    totalCustomers: 15,
    activeCustomers: 13,
    totalContacts: 25,
    totalOpportunities: 21,
    openOpportunities: 17,
    closedWonOpportunities: 3,
    closedLostOpportunities: 1,
    totalPipelineValue: 18755000,
    closedWonValue: 3620000,
    avgDealSize: 980000,
    avgSalesCycle: 92,
    winRate: 0.39
  },
  pipelineByStage: {
    discovery: { count: 4, value: 1605000 },
    qualification: { count: 2, value: 1630000 },
    proposal: { count: 5, value: 7400000 },
    negotiation: { count: 4, value: 7200000 },
    closedWon: { count: 3, value: 3620000 },
    closedLost: { count: 1, value: 125000 },
    stalled: { count: 1, value: 145000 }
  },
  pipelineByOwner: {
    "Sarah Mitchell": { count: 6, value: 5800000 },
    "Michael Chen": { count: 5, value: 1150000 },
    "Jennifer Rodriguez": { count: 5, value: 7755000 },
    "David Thompson": { count: 3, value: 4215000 }
  },
  customersByIndustry: {
    "Manufacturing": 2,
    "Technology": 2,
    "Transportation & Logistics": 2,
    "Healthcare": 2,
    "Consumer Goods": 1,
    "Financial Services": 1,
    "Education": 1,
    "Energy": 1,
    "Construction": 1,
    "Retail": 1,
    "Hospitality": 1
  },
  customersByStatus: {
    active: 13,
    atRisk: 1,
    inactive: 1
  },
  upcomingRenewals: [
    { customerId: "cust_012", name: "Mountain View Hospitality", renewalDate: "2024-12-31", value: 650000, risk: "High" },
    { customerId: "cust_002", name: "TechVenture Solutions", renewalDate: "2025-01-15", value: 175000, risk: "Low" },
    { customerId: "cust_009", name: "BuildRight Construction", renewalDate: "2025-01-31", value: 1200000, risk: "High" },
    { customerId: "cust_006", name: "Quantum Financial Services", renewalDate: "2025-02-28", value: 8900000, risk: "Low" },
    { customerId: "cust_004", name: "Riverside Medical Center", renewalDate: "2025-03-15", value: 3200000, risk: "Medium" }
  ],
  tasksSummary: {
    total: 20,
    pending: 10,
    inProgress: 6,
    completed: 4,
    overdue: 0,
    dueThisWeek: 8,
    highPriority: 7
  },
  recentActivity: {
    last24Hours: 8,
    last7Days: 25,
    last30Days: 45
  }
};

export default {
  customers,
  contacts,
  opportunities,
  activities,
  products,
  users,
  tasks,
  notes,
  statistics
};
