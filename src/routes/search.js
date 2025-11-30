import express from 'express';
import { customers } from '../data/customers.js';
import { contacts } from '../data/contacts.js';
import { opportunities } from '../data/opportunities.js';
import { activities } from '../data/activities.js';
import { notes } from '../data/notes.js';

const router = express.Router();

// Helper function to search text fields
const searchInObject = (obj, query, fields) => {
  const lowerQuery = query.toLowerCase();
  return fields.some(field => {
    const value = obj[field];
    if (typeof value === 'string') {
      return value.toLowerCase().includes(lowerQuery);
    }
    if (Array.isArray(value)) {
      return value.some(item => 
        typeof item === 'string' && item.toLowerCase().includes(lowerQuery)
      );
    }
    return false;
  });
};

// GET /api/search - Global search across all entities
router.get('/', (req, res) => {
  const query = req.query.q;
  if (!query || query.length < 2) {
    return res.status(400).json({ 
      error: 'Search query required', 
      message: 'Please provide a search query with at least 2 characters using the "q" parameter'
    });
  }
  
  const limit = parseInt(req.query.limit) || 10;
  
  // Search customers
  const customerResults = customers
    .filter(c => searchInObject(c, query, ['name', 'industry', 'sector', 'description', 'tags']))
    .slice(0, limit)
    .map(c => ({
      type: 'customer',
      id: c.id,
      name: c.name,
      industry: c.industry,
      status: c.status,
      matchField: c.name.toLowerCase().includes(query.toLowerCase()) ? 'name' : 'other'
    }));
  
  // Search contacts
  const contactResults = contacts
    .filter(c => searchInObject(c, query, ['firstName', 'lastName', 'title', 'email', 'department']))
    .slice(0, limit)
    .map(c => {
      const customer = customers.find(cust => cust.id === c.customerId);
      return {
        type: 'contact',
        id: c.id,
        name: `${c.firstName} ${c.lastName}`,
        title: c.title,
        customerName: customer ? customer.name : 'Unknown',
        email: c.email
      };
    });
  
  // Search opportunities
  const oppResults = opportunities
    .filter(o => searchInObject(o, query, ['name', 'description', 'stage', 'tags']))
    .slice(0, limit)
    .map(o => {
      const customer = customers.find(c => c.id === o.customerId);
      return {
        type: 'opportunity',
        id: o.id,
        name: o.name,
        customerName: customer ? customer.name : 'Unknown',
        stage: o.stage,
        amount: o.amount
      };
    });
  
  // Search notes
  const noteResults = notes
    .filter(n => searchInObject(n, query, ['title', 'content', 'tags']))
    .slice(0, limit)
    .map(n => {
      const customer = customers.find(c => c.id === n.customerId);
      return {
        type: 'note',
        id: n.id,
        title: n.title,
        customerName: customer ? customer.name : 'Unknown',
        isPinned: n.isPinned
      };
    });
  
  res.json({
    query,
    results: {
      customers: customerResults,
      contacts: contactResults,
      opportunities: oppResults,
      notes: noteResults
    },
    totals: {
      customers: customerResults.length,
      contacts: contactResults.length,
      opportunities: oppResults.length,
      notes: noteResults.length,
      total: customerResults.length + contactResults.length + oppResults.length + noteResults.length
    }
  });
});

// GET /api/search/customers - Search customers only
router.get('/customers', (req, res) => {
  const query = req.query.q;
  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Search query required (min 2 characters)' });
  }
  
  const results = customers
    .filter(c => searchInObject(c, query, ['name', 'industry', 'sector', 'description', 'tags', 'accountOwner']))
    .map(c => ({
      id: c.id,
      name: c.name,
      industry: c.industry,
      sector: c.sector,
      status: c.status,
      type: c.type,
      accountOwner: c.accountOwner,
      annualRevenue: c.annualRevenue,
      healthScore: c.healthScore
    }));
  
  res.json({
    query,
    results,
    total: results.length
  });
});

// GET /api/search/contacts - Search contacts only
router.get('/contacts', (req, res) => {
  const query = req.query.q;
  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Search query required (min 2 characters)' });
  }
  
  const results = contacts
    .filter(c => searchInObject(c, query, ['firstName', 'lastName', 'title', 'email', 'department', 'notes']))
    .map(c => {
      const customer = customers.find(cust => cust.id === c.customerId);
      return {
        id: c.id,
        name: `${c.firstName} ${c.lastName}`,
        title: c.title,
        email: c.email,
        phone: c.phone,
        department: c.department,
        customerId: c.customerId,
        customerName: customer ? customer.name : 'Unknown',
        decisionMaker: c.decisionMaker,
        influencer: c.influencer
      };
    });
  
  res.json({
    query,
    results,
    total: results.length
  });
});

// GET /api/search/opportunities - Search opportunities only
router.get('/opportunities', (req, res) => {
  const query = req.query.q;
  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Search query required (min 2 characters)' });
  }
  
  const results = opportunities
    .filter(o => searchInObject(o, query, ['name', 'description', 'stage', 'tags', 'owner']))
    .map(o => {
      const customer = customers.find(c => c.id === o.customerId);
      return {
        id: o.id,
        name: o.name,
        customerId: o.customerId,
        customerName: customer ? customer.name : 'Unknown',
        stage: o.stage,
        amount: o.amount,
        probability: o.probability,
        closeDate: o.closeDate,
        owner: o.owner,
        type: o.type
      };
    });
  
  res.json({
    query,
    results,
    total: results.length
  });
});

// GET /api/search/semantic - Semantic-like search for chatbot queries
router.get('/semantic', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: 'Search query required' });
  }
  
  let response = { query, intent: 'unknown', data: null };
  
  // Detect intent and provide relevant data
  
  // Customer-related queries
  if (query.includes('customer') || query.includes('account') || query.includes('client')) {
    if (query.includes('at risk') || query.includes('risk')) {
      response.intent = 'at_risk_customers';
      response.data = customers.filter(c => c.riskLevel === 'High' || c.status === 'At Risk');
    } else if (query.includes('largest') || query.includes('biggest') || query.includes('top revenue')) {
      response.intent = 'top_customers_by_revenue';
      response.data = [...customers].sort((a, b) => b.annualRevenue - a.annualRevenue).slice(0, 5);
    } else if (query.includes('health') && (query.includes('low') || query.includes('poor'))) {
      response.intent = 'low_health_customers';
      response.data = customers.filter(c => c.healthScore < 60);
    } else if (query.includes('enterprise')) {
      response.intent = 'enterprise_customers';
      response.data = customers.filter(c => c.type === 'Enterprise');
    }
  }
  
  // Opportunity-related queries
  if (query.includes('opportunit') || query.includes('deal') || query.includes('pipeline')) {
    if (query.includes('closing soon') || query.includes('close this month')) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      response.intent = 'opportunities_closing_soon';
      response.data = opportunities.filter(o => {
        const closeDate = new Date(o.closeDate);
        return closeDate <= nextMonth && !['Closed Won', 'Closed Lost'].includes(o.stage);
      });
    } else if (query.includes('largest') || query.includes('biggest')) {
      response.intent = 'largest_opportunities';
      response.data = [...opportunities]
        .filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    } else if (query.includes('stalled') || query.includes('stuck')) {
      response.intent = 'stalled_opportunities';
      response.data = opportunities.filter(o => o.stage === 'Stalled');
    } else if (query.includes('negotiation')) {
      response.intent = 'opportunities_in_negotiation';
      response.data = opportunities.filter(o => o.stage === 'Negotiation');
    }
  }
  
  // Contact-related queries
  if (query.includes('contact') || query.includes('decision maker') || query.includes('stakeholder')) {
    if (query.includes('decision maker')) {
      response.intent = 'decision_makers';
      response.data = contacts.filter(c => c.decisionMaker).map(c => {
        const customer = customers.find(cust => cust.id === c.customerId);
        return { ...c, customerName: customer?.name };
      });
    }
  }
  
  // Renewal-related queries
  if (query.includes('renewal') || query.includes('expiring')) {
    response.intent = 'upcoming_renewals';
    const in90Days = new Date();
    in90Days.setDate(in90Days.getDate() + 90);
    response.data = customers
      .filter(c => new Date(c.contractRenewalDate) <= in90Days)
      .sort((a, b) => new Date(a.contractRenewalDate) - new Date(b.contractRenewalDate));
  }
  
  // Revenue queries
  if (query.includes('revenue') || query.includes('forecast') || query.includes('quota')) {
    if (query.includes('forecast')) {
      response.intent = 'sales_forecast';
      const openOpps = opportunities.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
      response.data = {
        totalPipeline: openOpps.reduce((sum, o) => sum + o.amount, 0),
        weightedPipeline: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
        commit: openOpps.filter(o => o.forecastCategory === 'Commit').reduce((sum, o) => sum + o.amount, 0),
        bestCase: openOpps.filter(o => o.forecastCategory === 'Best Case').reduce((sum, o) => sum + o.amount, 0)
      };
    }
  }
  
  // Activity queries
  if (query.includes('recent') && (query.includes('activity') || query.includes('meeting') || query.includes('call'))) {
    response.intent = 'recent_activities';
    response.data = activities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
      .map(a => {
        const customer = customers.find(c => c.id === a.customerId);
        return { ...a, customerName: customer?.name };
      });
  }
  
  // Task queries
  if (query.includes('task') || query.includes('todo') || query.includes('action')) {
    if (query.includes('overdue')) {
      response.intent = 'overdue_tasks';
      response.data = tasks.filter(t => 
        new Date(t.dueDate) < new Date() && t.status !== 'Completed'
      );
    } else if (query.includes('high priority') || query.includes('urgent')) {
      response.intent = 'high_priority_tasks';
      response.data = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed');
    }
  }
  
  res.json(response);
});

export default router;
