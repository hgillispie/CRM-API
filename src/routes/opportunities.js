import express from 'express';
import { opportunities } from '../data/opportunities.js';
import { customers } from '../data/customers.js';
import { contacts } from '../data/contacts.js';
import { activities } from '../data/activities.js';

const router = express.Router();

// GET /api/opportunities - List all opportunities with filters
router.get('/', (req, res) => {
  let filtered = [...opportunities];
  
  // Apply filters
  if (req.query.stage) {
    filtered = filtered.filter(o => 
      o.stage.toLowerCase().replace(/\s+/g, '-') === req.query.stage.toLowerCase().replace(/\s+/g, '-')
    );
  }
  if (req.query.owner) {
    filtered = filtered.filter(o => 
      o.owner.toLowerCase().includes(req.query.owner.toLowerCase())
    );
  }
  if (req.query.customerId) {
    filtered = filtered.filter(o => o.customerId === req.query.customerId);
  }
  if (req.query.minAmount) {
    filtered = filtered.filter(o => o.amount >= parseInt(req.query.minAmount));
  }
  if (req.query.maxAmount) {
    filtered = filtered.filter(o => o.amount <= parseInt(req.query.maxAmount));
  }
  if (req.query.forecastCategory) {
    filtered = filtered.filter(o => 
      o.forecastCategory.toLowerCase() === req.query.forecastCategory.toLowerCase()
    );
  }
  if (req.query.type) {
    filtered = filtered.filter(o => 
      o.type.toLowerCase() === req.query.type.toLowerCase()
    );
  }
  if (req.query.closeAfter) {
    filtered = filtered.filter(o => new Date(o.closeDate) >= new Date(req.query.closeAfter));
  }
  if (req.query.closeBefore) {
    filtered = filtered.filter(o => new Date(o.closeDate) <= new Date(req.query.closeBefore));
  }
  if (req.query.minProbability) {
    filtered = filtered.filter(o => o.probability >= parseInt(req.query.minProbability));
  }
  
  // Enrich with customer names
  const enriched = filtered.map(opp => {
    const customer = customers.find(c => c.id === opp.customerId);
    return {
      ...opp,
      customerName: customer ? customer.name : 'Unknown'
    };
  });
  
  // Sorting
  const sortField = req.query.sort || 'closeDate';
  const sortOrder = req.query.order === 'desc' ? -1 : 1;
  enriched.sort((a, b) => {
    if (a[sortField] < b[sortField]) return -1 * sortOrder;
    if (a[sortField] > b[sortField]) return 1 * sortOrder;
    return 0;
  });
  
  // Pagination
  const limit = parseInt(req.query.limit) || enriched.length;
  const offset = parseInt(req.query.offset) || 0;
  const paginated = enriched.slice(offset, offset + limit);
  
  res.json({
    data: paginated,
    total: filtered.length,
    limit,
    offset,
    hasMore: offset + limit < filtered.length,
    summary: {
      totalValue: filtered.reduce((sum, o) => sum + o.amount, 0),
      weightedValue: filtered.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
      avgProbability: filtered.length > 0 
        ? Math.round(filtered.reduce((sum, o) => sum + o.probability, 0) / filtered.length)
        : 0
    }
  });
});

// GET /api/opportunities/pipeline - Pipeline summary
router.get('/pipeline', (req, res) => {
  const stages = ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost', 'Stalled'];
  
  const pipeline = stages.map(stage => {
    const stageOpps = opportunities.filter(o => o.stage === stage);
    return {
      stage,
      count: stageOpps.length,
      totalValue: stageOpps.reduce((sum, o) => sum + o.amount, 0),
      weightedValue: stageOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
      opportunities: stageOpps.map(o => {
        const customer = customers.find(c => c.id === o.customerId);
        return {
          id: o.id,
          name: o.name,
          customerName: customer ? customer.name : 'Unknown',
          amount: o.amount,
          probability: o.probability,
          closeDate: o.closeDate
        };
      })
    };
  });
  
  const openStages = ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Stalled'];
  const openOpps = opportunities.filter(o => openStages.includes(o.stage));
  
  res.json({
    pipeline,
    summary: {
      totalOpenOpportunities: openOpps.length,
      totalPipelineValue: openOpps.reduce((sum, o) => sum + o.amount, 0),
      totalWeightedValue: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
      avgDealSize: openOpps.length > 0 
        ? Math.round(openOpps.reduce((sum, o) => sum + o.amount, 0) / openOpps.length)
        : 0
    }
  });
});

// GET /api/opportunities/forecast - Sales forecast
router.get('/forecast', (req, res) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Get opportunities closing in next 3 months
  const forecast = [];
  for (let i = 0; i < 3; i++) {
    const targetMonth = new Date(currentYear, currentMonth + i, 1);
    const monthEnd = new Date(currentYear, currentMonth + i + 1, 0);
    
    const monthOpps = opportunities.filter(o => {
      const closeDate = new Date(o.closeDate);
      return closeDate >= targetMonth && closeDate <= monthEnd && 
             !['Closed Won', 'Closed Lost'].includes(o.stage);
    });
    
    forecast.push({
      month: targetMonth.toLocaleString('default', { month: 'long', year: 'numeric' }),
      opportunities: monthOpps.length,
      pipelineValue: monthOpps.reduce((sum, o) => sum + o.amount, 0),
      weightedValue: monthOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
      commit: monthOpps.filter(o => o.forecastCategory === 'Commit').reduce((sum, o) => sum + o.amount, 0),
      bestCase: monthOpps.filter(o => o.forecastCategory === 'Best Case').reduce((sum, o) => sum + o.amount, 0),
      pipeline: monthOpps.filter(o => o.forecastCategory === 'Pipeline').reduce((sum, o) => sum + o.amount, 0)
    });
  }
  
  // Closed won this year
  const closedWonThisYear = opportunities.filter(o => {
    const closeDate = new Date(o.closeDate);
    return o.stage === 'Closed Won' && closeDate.getFullYear() === currentYear;
  });
  
  res.json({
    forecast,
    yearToDate: {
      closedWon: closedWonThisYear.length,
      closedWonValue: closedWonThisYear.reduce((sum, o) => sum + o.amount, 0)
    }
  });
});

// GET /api/opportunities/:id - Get opportunity by ID
router.get('/:id', (req, res) => {
  const opportunity = opportunities.find(o => o.id === req.params.id);
  if (!opportunity) {
    return res.status(404).json({ error: 'Opportunity not found' });
  }
  
  const customer = customers.find(c => c.id === opportunity.customerId);
  const primaryContact = opportunity.primaryContactId 
    ? contacts.find(c => c.id === opportunity.primaryContactId)
    : null;
  const oppActivities = activities
    .filter(a => a.opportunityId === req.params.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  res.json({
    ...opportunity,
    customerName: customer ? customer.name : 'Unknown',
    customerIndustry: customer ? customer.industry : 'Unknown',
    primaryContact: primaryContact ? {
      id: primaryContact.id,
      name: `${primaryContact.firstName} ${primaryContact.lastName}`,
      title: primaryContact.title,
      email: primaryContact.email,
      phone: primaryContact.phone
    } : null,
    activityHistory: oppActivities.map(a => ({
      id: a.id,
      type: a.type,
      subject: a.subject,
      date: a.date,
      outcome: a.outcome,
      nextSteps: a.nextSteps
    })),
    weightedAmount: opportunity.amount * opportunity.probability / 100
  });
});

// GET /api/opportunities/by-owner/:owner - Get opportunities by owner
router.get('/by-owner/:owner', (req, res) => {
  const ownerOpps = opportunities.filter(o => 
    o.owner.toLowerCase().replace(/\s+/g, '-') === req.params.owner.toLowerCase().replace(/\s+/g, '-') ||
    o.owner.toLowerCase().includes(req.params.owner.toLowerCase())
  );
  
  const openOpps = ownerOpps.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
  
  res.json({
    owner: req.params.owner,
    opportunities: ownerOpps.map(o => {
      const customer = customers.find(c => c.id === o.customerId);
      return {
        ...o,
        customerName: customer ? customer.name : 'Unknown'
      };
    }),
    summary: {
      total: ownerOpps.length,
      open: openOpps.length,
      closedWon: ownerOpps.filter(o => o.stage === 'Closed Won').length,
      closedLost: ownerOpps.filter(o => o.stage === 'Closed Lost').length,
      totalOpenValue: openOpps.reduce((sum, o) => sum + o.amount, 0),
      weightedValue: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0)
    }
  });
});

// GET /api/opportunities/closing-soon - Get opportunities closing soon
router.get('/closing/soon', (req, res) => {
  const days = parseInt(req.query.days) || 30;
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  
  const closingSoon = opportunities
    .filter(o => {
      const closeDate = new Date(o.closeDate);
      return closeDate >= now && closeDate <= futureDate && 
             !['Closed Won', 'Closed Lost'].includes(o.stage);
    })
    .sort((a, b) => new Date(a.closeDate) - new Date(b.closeDate));
  
  res.json({
    timeframe: `Next ${days} days`,
    opportunities: closingSoon.map(o => {
      const customer = customers.find(c => c.id === o.customerId);
      return {
        id: o.id,
        name: o.name,
        customerName: customer ? customer.name : 'Unknown',
        amount: o.amount,
        probability: o.probability,
        stage: o.stage,
        closeDate: o.closeDate,
        owner: o.owner,
        nextStep: o.nextStep
      };
    }),
    total: closingSoon.length,
    totalValue: closingSoon.reduce((sum, o) => sum + o.amount, 0)
  });
});

export default router;
