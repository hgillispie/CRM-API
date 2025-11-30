import express from 'express';
import { customers } from '../data/customers.js';
import { contacts } from '../data/contacts.js';
import { opportunities } from '../data/opportunities.js';
import { activities } from '../data/activities.js';
import { notes } from '../data/notes.js';
import { tasks } from '../data/tasks.js';

const router = express.Router();

// Helper function to filter and paginate results
const filterAndPaginate = (data, query) => {
  let filtered = [...data];
  
  // Apply filters
  if (query.industry) {
    filtered = filtered.filter(c => c.industry.toLowerCase() === query.industry.toLowerCase());
  }
  if (query.status) {
    filtered = filtered.filter(c => c.status.toLowerCase() === query.status.toLowerCase());
  }
  if (query.type) {
    filtered = filtered.filter(c => c.type.toLowerCase() === query.type.toLowerCase());
  }
  if (query.owner) {
    filtered = filtered.filter(c => c.accountOwner.toLowerCase().includes(query.owner.toLowerCase()));
  }
  if (query.minRevenue) {
    filtered = filtered.filter(c => c.annualRevenue >= parseInt(query.minRevenue));
  }
  if (query.maxRevenue) {
    filtered = filtered.filter(c => c.annualRevenue <= parseInt(query.maxRevenue));
  }
  if (query.riskLevel) {
    filtered = filtered.filter(c => c.riskLevel.toLowerCase() === query.riskLevel.toLowerCase());
  }
  if (query.minHealthScore) {
    filtered = filtered.filter(c => c.healthScore >= parseInt(query.minHealthScore));
  }
  if (query.maxHealthScore) {
    filtered = filtered.filter(c => c.healthScore <= parseInt(query.maxHealthScore));
  }
  if (query.tags) {
    const searchTags = query.tags.toLowerCase().split(',');
    filtered = filtered.filter(c => 
      c.tags.some(tag => searchTags.includes(tag.toLowerCase()))
    );
  }
  
  // Sorting
  if (query.sort) {
    const sortField = query.sort;
    const sortOrder = query.order === 'desc' ? -1 : 1;
    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }
  
  // Pagination
  const limit = parseInt(query.limit) || filtered.length;
  const offset = parseInt(query.offset) || 0;
  const paginated = filtered.slice(offset, offset + limit);
  
  return {
    data: paginated,
    total: filtered.length,
    limit,
    offset,
    hasMore: offset + limit < filtered.length
  };
};

// GET /api/customers - List all customers with optional filters
router.get('/', (req, res) => {
  const result = filterAndPaginate(customers, req.query);
  res.json(result);
});

// GET /api/customers/:id - Get customer by ID
router.get('/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

// GET /api/customers/:id/contacts - Get contacts for a customer
router.get('/:id/contacts', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  const customerContacts = contacts.filter(c => c.customerId === req.params.id);
  res.json({
    customerId: req.params.id,
    customerName: customer.name,
    contacts: customerContacts,
    total: customerContacts.length
  });
});

// GET /api/customers/:id/opportunities - Get opportunities for a customer
router.get('/:id/opportunities', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  const customerOpps = opportunities.filter(o => o.customerId === req.params.id);
  
  // Calculate summary
  const openOpps = customerOpps.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
  const closedWon = customerOpps.filter(o => o.stage === 'Closed Won');
  const closedLost = customerOpps.filter(o => o.stage === 'Closed Lost');
  
  res.json({
    customerId: req.params.id,
    customerName: customer.name,
    opportunities: customerOpps,
    summary: {
      total: customerOpps.length,
      open: openOpps.length,
      closedWon: closedWon.length,
      closedLost: closedLost.length,
      totalOpenValue: openOpps.reduce((sum, o) => sum + o.amount, 0),
      totalWonValue: closedWon.reduce((sum, o) => sum + o.amount, 0),
      weightedPipeline: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0)
    }
  });
});

// GET /api/customers/:id/activities - Get activities for a customer
router.get('/:id/activities', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  let customerActivities = activities.filter(a => a.customerId === req.params.id);
  
  // Sort by date descending (most recent first)
  customerActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Limit results if requested
  const limit = parseInt(req.query.limit) || customerActivities.length;
  customerActivities = customerActivities.slice(0, limit);
  
  res.json({
    customerId: req.params.id,
    customerName: customer.name,
    activities: customerActivities,
    total: customerActivities.length
  });
});

// GET /api/customers/:id/notes - Get notes for a customer
router.get('/:id/notes', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  const customerNotes = notes.filter(n => n.customerId === req.params.id);
  
  // Sort pinned notes first, then by date
  customerNotes.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  
  res.json({
    customerId: req.params.id,
    customerName: customer.name,
    notes: customerNotes,
    total: customerNotes.length
  });
});

// GET /api/customers/:id/tasks - Get tasks for a customer
router.get('/:id/tasks', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  let customerTasks = tasks.filter(t => t.customerId === req.params.id);
  
  // Filter by status if provided
  if (req.query.status) {
    customerTasks = customerTasks.filter(t => 
      t.status.toLowerCase() === req.query.status.toLowerCase()
    );
  }
  
  // Sort by due date
  customerTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  res.json({
    customerId: req.params.id,
    customerName: customer.name,
    tasks: customerTasks,
    total: customerTasks.length,
    summary: {
      pending: customerTasks.filter(t => t.status === 'Pending').length,
      inProgress: customerTasks.filter(t => t.status === 'In Progress').length,
      completed: customerTasks.filter(t => t.status === 'Completed').length
    }
  });
});

// GET /api/customers/:id/summary - Get comprehensive customer summary
router.get('/:id/summary', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  const customerContacts = contacts.filter(c => c.customerId === req.params.id);
  const customerOpps = opportunities.filter(o => o.customerId === req.params.id);
  const customerActivities = activities.filter(a => a.customerId === req.params.id);
  const customerNotes = notes.filter(n => n.customerId === req.params.id);
  const customerTasks = tasks.filter(t => t.customerId === req.params.id);
  
  const openOpps = customerOpps.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
  const recentActivities = customerActivities
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  const openTasks = customerTasks.filter(t => t.status !== 'Completed');
  const primaryContact = customerContacts.find(c => c.isPrimary);
  
  res.json({
    customer,
    summary: {
      totalContacts: customerContacts.length,
      primaryContact: primaryContact ? {
        name: `${primaryContact.firstName} ${primaryContact.lastName}`,
        title: primaryContact.title,
        email: primaryContact.email,
        phone: primaryContact.phone
      } : null,
      decisionMakers: customerContacts.filter(c => c.decisionMaker).map(c => ({
        name: `${c.firstName} ${c.lastName}`,
        title: c.title
      })),
      opportunities: {
        total: customerOpps.length,
        open: openOpps.length,
        totalOpenValue: openOpps.reduce((sum, o) => sum + o.amount, 0),
        weightedPipeline: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
        stages: openOpps.map(o => ({
          name: o.name,
          stage: o.stage,
          amount: o.amount,
          probability: o.probability,
          closeDate: o.closeDate
        }))
      },
      recentActivities: recentActivities.map(a => ({
        type: a.type,
        subject: a.subject,
        date: a.date,
        outcome: a.outcome
      })),
      openTasks: openTasks.map(t => ({
        title: t.title,
        priority: t.priority,
        dueDate: t.dueDate,
        status: t.status
      })),
      keyNotes: customerNotes.filter(n => n.isPinned).map(n => ({
        title: n.title,
        updatedAt: n.updatedAt
      })),
      healthIndicators: {
        healthScore: customer.healthScore,
        riskLevel: customer.riskLevel,
        lastActivityDate: customer.lastActivityDate,
        contractRenewalDate: customer.contractRenewalDate,
        lifetimeValue: customer.lifetimeValue
      }
    }
  });
});

export default router;
