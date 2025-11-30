import express from 'express';
import cors from 'cors';
import { 
  customers, contacts, opportunities, pipelineMetrics,
  activities, activitySummary, products, users, teamMetrics,
  tasks, tasksSummary, notes, statistics 
} from './data/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// CHATBOT-OPTIMIZED ENDPOINTS
// ============================================

// Pipeline status - "What's our current deal pipeline status?"
app.get('/api/pipeline', (req, res) => {
  const activeDeals = opportunities.filter(o => 
    !['Closed Won', 'Closed Lost'].includes(o.stage)
  );
  
  res.json({
    summary: {
      totalDeals: pipelineMetrics.currentQuarter.totalDeals,
      totalValue: pipelineMetrics.currentQuarter.totalValue,
      averageDealSize: pipelineMetrics.currentQuarter.averageDealSize,
      weightedPipeline: pipelineMetrics.currentQuarter.weightedPipeline
    },
    byStage: pipelineMetrics.currentQuarter.byStage,
    deals: pipelineMetrics.topDealsByValue,
    closestToClosing: pipelineMetrics.closestToClosing
  });
});

// Top customers by deal value - "Summarize our top customers by deal value"
app.get('/api/customers/top', (req, res) => {
  res.json({
    topCustomersByDealValue: pipelineMetrics.topDealsByValue,
    summary: "Top 5 customers ranked by current deal value"
  });
});

// Deals closest to closing - "Which deals are closest to closing?"
app.get('/api/deals/closing-soon', (req, res) => {
  res.json({
    deals: pipelineMetrics.closestToClosing,
    summary: "Deals ordered by probability and close date"
  });
});

// Conversion rate - "How can I improve our conversion rate?" / "What's the reason for the conversion rate decline?"
app.get('/api/metrics/conversion', (req, res) => {
  res.json({
    currentRate: teamMetrics.conversion.currentRate,
    previousRate: teamMetrics.conversion.previousQuarterRate,
    change: teamMetrics.conversion.change,
    trend: teamMetrics.conversion.trend,
    factors: teamMetrics.conversion.factors,
    recommendations: teamMetrics.conversion.recommendations,
    analysis: `Conversion rate is ${teamMetrics.conversion.currentRate}%, down ${Math.abs(teamMetrics.conversion.change)}% from last quarter (${teamMetrics.conversion.previousQuarterRate}%). This decline is concerning and needs to be addressed.`
  });
});

// Pipeline risks - "What are the top 3 risks in our current pipeline?"
app.get('/api/pipeline/risks', (req, res) => {
  res.json({
    risks: pipelineMetrics.pipelineRisks,
    summary: "Top pipeline risks ranked by severity and deal value"
  });
});

// Today's priorities - "Which customer should I focus on first today?"
app.get('/api/tasks/priorities', (req, res) => {
  res.json({
    todaysPriorities: tasksSummary.todaysPriorities,
    recommendation: tasksSummary.prioritizationRecommendation,
    thisWeekTasks: tasksSummary.thisWeek.byCustomer
  });
});

// Follow-ups this week - "What customer follow-ups do I have this week?"
app.get('/api/tasks/this-week', (req, res) => {
  const thisWeekTasks = tasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return dueDate >= now && dueDate <= weekFromNow && t.status !== 'Completed';
  });
  
  res.json({
    tasks: tasksSummary.thisWeek.byCustomer,
    total: tasksSummary.thisWeek.total,
    highPriority: tasksSummary.thisWeek.highPriority,
    criticalTasks: tasksSummary.thisWeek.criticalTasks
  });
});

// Activity summary - "Generate an activity summary for today"
app.get('/api/activities/summary', (req, res) => {
  res.json({
    today: activitySummary.today,
    lastWeek: activitySummary.lastWeek,
    engagementByCustomer: activitySummary.engagementByCustomer
  });
});

// Average deal size - "What's our average deal size this quarter?"
app.get('/api/metrics/deal-size', (req, res) => {
  res.json({
    averageDealSize: pipelineMetrics.currentQuarter.averageDealSize,
    totalDeals: pipelineMetrics.currentQuarter.totalDeals,
    totalValue: pipelineMetrics.currentQuarter.totalValue,
    calculation: `$${pipelineMetrics.currentQuarter.totalValue.toLocaleString()} total across ${pipelineMetrics.currentQuarter.totalDeals} deals = $${pipelineMetrics.currentQuarter.averageDealSize.toLocaleString()} average`
  });
});

// Customer at risk - "Which customer is most at risk?"
app.get('/api/customers/at-risk', (req, res) => {
  const atRiskCustomers = customers.filter(c => 
    c.status === 'At Risk' || c.riskLevel === 'High'
  );
  
  const atRiskDeals = opportunities.filter(o => o.atRisk);
  
  res.json({
    customers: atRiskCustomers.map(c => ({
      id: c.id,
      name: c.name,
      riskLevel: c.riskLevel,
      healthScore: c.healthScore,
      riskFactors: c.riskFactors || [],
      lifetimeValue: c.lifetimeValue,
      nextSteps: c.nextSteps
    })),
    atRiskDeals: atRiskDeals.map(d => ({
      customer: d.customerName,
      deal: d.name,
      value: d.amount,
      riskReason: d.riskReason
    })),
    mostAtRisk: pipelineMetrics.pipelineRisks[0]
  });
});

// ============================================
// DEAL-SPECIFIC ENDPOINTS
// ============================================

// Get specific deal details - "Tell me more about the HealthCare Pro deal"
app.get('/api/deals/:customerName', (req, res) => {
  const customerName = req.params.customerName.toLowerCase().replace(/-/g, ' ');
  
  const deal = opportunities.find(o => 
    o.customerName.toLowerCase() === customerName ||
    o.customerName.toLowerCase().includes(customerName)
  );
  
  if (!deal) {
    return res.status(404).json({ error: 'Deal not found', searchedFor: customerName });
  }
  
  const customer = customers.find(c => c.id === deal.customerId);
  const dealContacts = contacts.filter(c => c.customerId === deal.customerId);
  const dealActivities = activities
    .filter(a => a.opportunityId === deal.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const dealNotes = notes.filter(n => n.opportunityId === deal.id);
  const dealTasks = tasks.filter(t => t.opportunityId === deal.id && t.status !== 'Completed');
  
  res.json({
    deal: {
      ...deal,
      customerDetails: customer ? {
        industry: customer.industry,
        annualRevenue: customer.annualRevenue,
        employeeCount: customer.employeeCount,
        healthScore: customer.healthScore
      } : null
    },
    contacts: dealContacts.map(c => ({
      name: `${c.firstName} ${c.lastName}`,
      title: c.title,
      role: c.decisionMaker ? 'Decision Maker' : c.champion ? 'Champion' : 'Influencer',
      sentiment: c.sentiment,
      lastContacted: c.lastContactedDate
    })),
    recentActivities: dealActivities.slice(0, 5),
    notes: dealNotes,
    openTasks: dealTasks,
    negotiationContext: deal.negotiationContext || null,
    approachRecommendation: deal.approachRecommendation || null
  });
});

// Negotiation advice - "How should I approach the TechSolutions negotiation?"
app.get('/api/deals/:customerName/negotiation', (req, res) => {
  const customerName = req.params.customerName.toLowerCase().replace(/-/g, ' ');
  
  const deal = opportunities.find(o => 
    o.customerName.toLowerCase() === customerName ||
    o.customerName.toLowerCase().includes(customerName)
  );
  
  if (!deal) {
    return res.status(404).json({ error: 'Deal not found' });
  }
  
  const dealNotes = notes.filter(n => n.opportunityId === deal.id);
  
  res.json({
    deal: {
      name: deal.name,
      customer: deal.customerName,
      stage: deal.stage,
      amount: deal.amount,
      probability: deal.probability,
      closeDate: deal.closeDate
    },
    negotiationContext: deal.negotiationContext || {
      mainObjection: deal.competitorAnalysis || 'No specific objection recorded',
      competitors: deal.competitors,
      nextStep: deal.nextStep
    },
    approachRecommendation: deal.approachRecommendation || deal.dealNotes,
    competitorAnalysis: deal.competitorAnalysis,
    risks: deal.risks,
    strengths: deal.strengths,
    strategicNotes: dealNotes
  });
});

// ============================================
// STANDARD CRUD ENDPOINTS
// ============================================

// Customers
app.get('/api/customers', (req, res) => {
  let filtered = [...customers];
  
  if (req.query.status) {
    filtered = filtered.filter(c => c.status.toLowerCase() === req.query.status.toLowerCase());
  }
  if (req.query.industry) {
    filtered = filtered.filter(c => c.industry.toLowerCase().includes(req.query.industry.toLowerCase()));
  }
  
  res.json({
    data: filtered,
    total: filtered.length
  });
});

app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  const customerContacts = contacts.filter(c => c.customerId === req.params.id);
  const customerOpps = opportunities.filter(o => o.customerId === req.params.id);
  const customerActivities = activities.filter(a => a.customerId === req.params.id);
  
  res.json({
    ...customer,
    contacts: customerContacts,
    opportunities: customerOpps,
    recentActivities: customerActivities.slice(0, 5)
  });
});

// Contacts
app.get('/api/contacts', (req, res) => {
  let filtered = [...contacts];
  
  if (req.query.customerId) {
    filtered = filtered.filter(c => c.customerId === req.query.customerId);
  }
  if (req.query.decisionMaker === 'true') {
    filtered = filtered.filter(c => c.decisionMaker);
  }
  
  res.json({
    data: filtered,
    total: filtered.length
  });
});

// Opportunities
app.get('/api/opportunities', (req, res) => {
  let filtered = [...opportunities];
  
  if (req.query.stage) {
    filtered = filtered.filter(o => o.stage.toLowerCase() === req.query.stage.toLowerCase());
  }
  if (req.query.customerId) {
    filtered = filtered.filter(o => o.customerId === req.query.customerId);
  }
  
  res.json({
    data: filtered,
    total: filtered.length,
    metrics: pipelineMetrics.currentQuarter
  });
});

app.get('/api/opportunities/:id', (req, res) => {
  const opp = opportunities.find(o => o.id === req.params.id);
  if (!opp) {
    return res.status(404).json({ error: 'Opportunity not found' });
  }
  res.json(opp);
});

// Activities
app.get('/api/activities', (req, res) => {
  let filtered = [...activities];
  
  if (req.query.customerId) {
    filtered = filtered.filter(a => a.customerId === req.query.customerId);
  }
  if (req.query.type) {
    filtered = filtered.filter(a => a.type === req.query.type);
  }
  
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  res.json({
    data: filtered,
    total: filtered.length
  });
});

// Tasks
app.get('/api/tasks', (req, res) => {
  let filtered = [...tasks];
  
  if (req.query.status) {
    filtered = filtered.filter(t => t.status === req.query.status);
  }
  if (req.query.priority) {
    filtered = filtered.filter(t => t.priority === req.query.priority);
  }
  if (req.query.customerId) {
    filtered = filtered.filter(t => t.customerId === req.query.customerId);
  }
  
  res.json({
    data: filtered,
    total: filtered.length,
    summary: tasksSummary
  });
});

// Notes
app.get('/api/notes', (req, res) => {
  let filtered = [...notes];
  
  if (req.query.customerId) {
    filtered = filtered.filter(n => n.customerId === req.query.customerId);
  }
  
  res.json({
    data: filtered,
    total: filtered.length
  });
});

// Products
app.get('/api/products', (req, res) => {
  res.json({
    data: products,
    total: products.length
  });
});

// Users
app.get('/api/users', (req, res) => {
  res.json({
    data: users,
    total: users.length,
    teamMetrics
  });
});

// Statistics / Overview
app.get('/api/stats', (req, res) => {
  res.json(statistics);
});

app.get('/api/stats/overview', (req, res) => {
  res.json({
    pipeline: statistics.pipeline,
    conversion: statistics.conversion,
    customers: statistics.customers
  });
});

// ============================================
// SEARCH ENDPOINT
// ============================================

app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase();
  
  if (!query) {
    return res.status(400).json({ error: 'Search query required' });
  }
  
  const results = {
    customers: customers.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.industry.toLowerCase().includes(query)
    ),
    opportunities: opportunities.filter(o =>
      o.name.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query)
    ),
    contacts: contacts.filter(c =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(query) ||
      c.title.toLowerCase().includes(query)
    )
  };
  
  res.json(results);
});

// ============================================
// UTILITY ENDPOINTS
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API documentation
app.get('/api', (req, res) => {
  res.json({
    name: "Mock CRM API",
    version: "1.0.0",
    description: "CRM API optimized for chatbot queries",
    chatbotEndpoints: {
      "GET /api/pipeline": "Current deal pipeline status",
      "GET /api/customers/top": "Top customers by deal value",
      "GET /api/deals/closing-soon": "Deals closest to closing",
      "GET /api/metrics/conversion": "Conversion rate analysis",
      "GET /api/pipeline/risks": "Top pipeline risks",
      "GET /api/tasks/priorities": "Today's priorities",
      "GET /api/tasks/this-week": "This week's follow-ups",
      "GET /api/activities/summary": "Activity summary",
      "GET /api/metrics/deal-size": "Average deal size",
      "GET /api/customers/at-risk": "At-risk customers",
      "GET /api/deals/:customerName": "Specific deal details",
      "GET /api/deals/:customerName/negotiation": "Negotiation advice"
    },
    standardEndpoints: {
      "GET /api/customers": "List customers",
      "GET /api/contacts": "List contacts",
      "GET /api/opportunities": "List opportunities",
      "GET /api/activities": "List activities",
      "GET /api/tasks": "List tasks",
      "GET /api/notes": "List notes",
      "GET /api/products": "List products",
      "GET /api/users": "List users",
      "GET /api/stats": "Statistics overview"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: `Endpoint ${req.method} ${req.path} does not exist`,
    hint: 'Visit /api for available endpoints'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    Mock CRM API Server                       ║
╠══════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}                    ║
║  API Documentation: http://localhost:${PORT}/api                ║
╠══════════════════════════════════════════════════════════════╣
║  Chatbot-Optimized Endpoints:                                ║
║  • /api/pipeline           - Deal pipeline status            ║
║  • /api/customers/top      - Top customers by value          ║
║  • /api/deals/closing-soon - Deals closest to closing        ║
║  • /api/metrics/conversion - Conversion rate analysis        ║
║  • /api/pipeline/risks     - Top pipeline risks              ║
║  • /api/tasks/priorities   - Today's priorities              ║
║  • /api/tasks/this-week    - Weekly follow-ups               ║
║  • /api/deals/:name        - Deal details (e.g. healthcare-pro)║
╚══════════════════════════════════════════════════════════════╝
  `);
});

export default app;
