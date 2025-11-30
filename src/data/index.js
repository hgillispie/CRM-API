// Central data export for mock CRM API
import { customers } from './customers.js';
import { contacts } from './contacts.js';
import { opportunities, pipelineMetrics } from './opportunities.js';
import { activities, activitySummary } from './activities.js';
import { products } from './products.js';
import { users, teamMetrics } from './users.js';
import { tasks, tasksSummary } from './tasks.js';
import { notes } from './notes.js';

export { customers } from './customers.js';
export { contacts } from './contacts.js';
export { opportunities, pipelineMetrics } from './opportunities.js';
export { activities, activitySummary } from './activities.js';
export { products } from './products.js';
export { users, teamMetrics } from './users.js';
export { tasks, tasksSummary } from './tasks.js';
export { notes } from './notes.js';

// Aggregated statistics for dashboard/chatbot queries
export const statistics = {
  // Pipeline overview (matches chatbot query expectations)
  pipeline: {
    totalDeals: 5,
    totalValue: 487500,
    averageDealSize: 97500,
    weightedValue: 300000,
    byStage: {
      qualification: { count: 1, value: 50000 },
      proposal: { count: 2, value: 275000 },
      negotiation: { count: 1, value: 87500 },
      closedWon: { count: 1, value: 75000 }
    },
    topDealsByValue: pipelineMetrics.topDealsByValue,
    closestToClosing: pipelineMetrics.closestToClosing
  },
  
  // Conversion metrics (for "conversion rate" queries)
  conversion: {
    currentRate: 28,
    previousRate: 33,
    change: -5,
    trend: "declining",
    analysis: "Conversion rate declined 5% this quarter due to increased competition and longer decision cycles.",
    recommendations: [
      "Improve early-stage qualification",
      "Develop competitive battle cards", 
      "Accelerate proof-of-value demos",
      "Consider flexible pricing"
    ]
  },
  
  // Risk analysis (for "top risks" queries)
  pipelineRisks: pipelineMetrics.pipelineRisks,
  
  // Customer summary
  customers: {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    atRisk: customers.filter(c => c.status === 'At Risk' || c.riskLevel === 'High').length
  },
  
  // Tasks summary  
  tasks: tasksSummary,
  
  // Activity summary
  activities: activitySummary
};

export default {
  customers,
  contacts,
  opportunities,
  pipelineMetrics,
  activities,
  activitySummary,
  products,
  users,
  teamMetrics,
  tasks,
  tasksSummary,
  notes,
  statistics
};
