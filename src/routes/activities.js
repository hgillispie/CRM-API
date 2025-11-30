import express from 'express';
import { activities } from '../data/activities.js';
import { customers } from '../data/customers.js';
import { contacts } from '../data/contacts.js';

const router = express.Router();

// GET /api/activities - List all activities with filters
router.get('/', (req, res) => {
  let filtered = [...activities];
  
  // Apply filters
  if (req.query.type) {
    filtered = filtered.filter(a => a.type.toLowerCase() === req.query.type.toLowerCase());
  }
  if (req.query.customerId) {
    filtered = filtered.filter(a => a.customerId === req.query.customerId);
  }
  if (req.query.contactId) {
    filtered = filtered.filter(a => a.contactId === req.query.contactId);
  }
  if (req.query.opportunityId) {
    filtered = filtered.filter(a => a.opportunityId === req.query.opportunityId);
  }
  if (req.query.outcome) {
    filtered = filtered.filter(a => a.outcome.toLowerCase() === req.query.outcome.toLowerCase());
  }
  if (req.query.owner) {
    filtered = filtered.filter(a => 
      a.owner.toLowerCase().includes(req.query.owner.toLowerCase())
    );
  }
  if (req.query.startDate) {
    filtered = filtered.filter(a => new Date(a.date) >= new Date(req.query.startDate));
  }
  if (req.query.endDate) {
    filtered = filtered.filter(a => new Date(a.date) <= new Date(req.query.endDate));
  }
  
  // Enrich with customer and contact names
  const enriched = filtered.map(activity => {
    const customer = customers.find(c => c.id === activity.customerId);
    const contact = activity.contactId 
      ? contacts.find(c => c.id === activity.contactId)
      : null;
    return {
      ...activity,
      customerName: customer ? customer.name : 'Unknown',
      contactName: contact ? `${contact.firstName} ${contact.lastName}` : null
    };
  });
  
  // Sort by date descending
  enriched.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Pagination
  const limit = parseInt(req.query.limit) || enriched.length;
  const offset = parseInt(req.query.offset) || 0;
  const paginated = enriched.slice(offset, offset + limit);
  
  res.json({
    data: paginated,
    total: filtered.length,
    limit,
    offset,
    hasMore: offset + limit < filtered.length
  });
});

// GET /api/activities/recent - Get recent activities
router.get('/recent', (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  const recentActivities = activities
    .filter(a => new Date(a.date) >= pastDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(activity => {
      const customer = customers.find(c => c.id === activity.customerId);
      const contact = activity.contactId 
        ? contacts.find(c => c.id === activity.contactId)
        : null;
      return {
        ...activity,
        customerName: customer ? customer.name : 'Unknown',
        contactName: contact ? `${contact.firstName} ${contact.lastName}` : null
      };
    });
  
  // Group by type
  const byType = {
    meeting: recentActivities.filter(a => a.type === 'meeting'),
    call: recentActivities.filter(a => a.type === 'call'),
    email: recentActivities.filter(a => a.type === 'email'),
    demo: recentActivities.filter(a => a.type === 'demo')
  };
  
  res.json({
    timeframe: `Last ${days} days`,
    activities: recentActivities,
    total: recentActivities.length,
    byType: {
      meeting: byType.meeting.length,
      call: byType.call.length,
      email: byType.email.length,
      demo: byType.demo.length
    },
    byOutcome: {
      positive: recentActivities.filter(a => a.outcome === 'Positive').length,
      neutral: recentActivities.filter(a => a.outcome === 'Neutral').length,
      negative: recentActivities.filter(a => a.outcome === 'Negative').length,
      actionRequired: recentActivities.filter(a => a.outcome === 'Action Required').length
    }
  });
});

// GET /api/activities/summary - Activity summary
router.get('/summary', (req, res) => {
  const now = new Date();
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const last30 = activities.filter(a => new Date(a.date) >= last30Days);
  const last7 = activities.filter(a => new Date(a.date) >= last7Days);
  
  // Activities by owner (last 30 days)
  const byOwner = {};
  last30.forEach(a => {
    if (!byOwner[a.owner]) {
      byOwner[a.owner] = { total: 0, meetings: 0, calls: 0, emails: 0, demos: 0 };
    }
    byOwner[a.owner].total++;
    byOwner[a.owner][a.type + 's']++;
  });
  
  res.json({
    summary: {
      last7Days: {
        total: last7.length,
        meetings: last7.filter(a => a.type === 'meeting').length,
        calls: last7.filter(a => a.type === 'call').length,
        emails: last7.filter(a => a.type === 'email').length,
        demos: last7.filter(a => a.type === 'demo').length
      },
      last30Days: {
        total: last30.length,
        meetings: last30.filter(a => a.type === 'meeting').length,
        calls: last30.filter(a => a.type === 'call').length,
        emails: last30.filter(a => a.type === 'email').length,
        demos: last30.filter(a => a.type === 'demo').length
      },
      byOwner
    }
  });
});

// GET /api/activities/:id - Get activity by ID
router.get('/:id', (req, res) => {
  const activity = activities.find(a => a.id === req.params.id);
  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }
  
  const customer = customers.find(c => c.id === activity.customerId);
  const contact = activity.contactId 
    ? contacts.find(c => c.id === activity.contactId)
    : null;
  
  res.json({
    ...activity,
    customerName: customer ? customer.name : 'Unknown',
    contactName: contact ? `${contact.firstName} ${contact.lastName}` : null,
    contactTitle: contact ? contact.title : null
  });
});

export default router;
