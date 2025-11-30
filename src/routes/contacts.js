import express from 'express';
import { contacts } from '../data/contacts.js';
import { customers } from '../data/customers.js';
import { activities } from '../data/activities.js';

const router = express.Router();

// GET /api/contacts - List all contacts with optional filters
router.get('/', (req, res) => {
  let filtered = [...contacts];
  
  // Apply filters
  if (req.query.customerId) {
    filtered = filtered.filter(c => c.customerId === req.query.customerId);
  }
  if (req.query.decisionMaker === 'true') {
    filtered = filtered.filter(c => c.decisionMaker === true);
  }
  if (req.query.influencer === 'true') {
    filtered = filtered.filter(c => c.influencer === true);
  }
  if (req.query.department) {
    filtered = filtered.filter(c => 
      c.department.toLowerCase().includes(req.query.department.toLowerCase())
    );
  }
  if (req.query.title) {
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(req.query.title.toLowerCase())
    );
  }
  if (req.query.tags) {
    const searchTags = req.query.tags.toLowerCase().split(',');
    filtered = filtered.filter(c => 
      c.tags.some(tag => searchTags.includes(tag.toLowerCase()))
    );
  }
  
  // Add customer name to each contact
  const enrichedContacts = filtered.map(contact => {
    const customer = customers.find(c => c.id === contact.customerId);
    return {
      ...contact,
      customerName: customer ? customer.name : 'Unknown'
    };
  });
  
  // Sorting
  if (req.query.sort) {
    const sortField = req.query.sort;
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    enrichedContacts.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }
  
  // Pagination
  const limit = parseInt(req.query.limit) || enrichedContacts.length;
  const offset = parseInt(req.query.offset) || 0;
  const paginated = enrichedContacts.slice(offset, offset + limit);
  
  res.json({
    data: paginated,
    total: filtered.length,
    limit,
    offset,
    hasMore: offset + limit < filtered.length
  });
});

// GET /api/contacts/:id - Get contact by ID
router.get('/:id', (req, res) => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  
  const customer = customers.find(c => c.id === contact.customerId);
  const contactActivities = activities
    .filter(a => a.contactId === req.params.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
  
  res.json({
    ...contact,
    customerName: customer ? customer.name : 'Unknown',
    customerIndustry: customer ? customer.industry : 'Unknown',
    recentActivities: contactActivities.map(a => ({
      id: a.id,
      type: a.type,
      subject: a.subject,
      date: a.date,
      outcome: a.outcome
    }))
  });
});

// GET /api/contacts/decision-makers - Get all decision makers
router.get('/role/decision-makers', (req, res) => {
  const decisionMakers = contacts
    .filter(c => c.decisionMaker)
    .map(contact => {
      const customer = customers.find(c => c.id === contact.customerId);
      return {
        id: contact.id,
        name: `${contact.firstName} ${contact.lastName}`,
        title: contact.title,
        email: contact.email,
        phone: contact.phone,
        customerId: contact.customerId,
        customerName: customer ? customer.name : 'Unknown',
        lastContactedDate: contact.lastContactedDate
      };
    });
  
  res.json({
    data: decisionMakers,
    total: decisionMakers.length
  });
});

// GET /api/contacts/by-customer/:customerId - Get contacts by customer
router.get('/by-customer/:customerId', (req, res) => {
  const customer = customers.find(c => c.id === req.params.customerId);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  const customerContacts = contacts.filter(c => c.customerId === req.params.customerId);
  
  res.json({
    customerId: req.params.customerId,
    customerName: customer.name,
    contacts: customerContacts,
    summary: {
      total: customerContacts.length,
      decisionMakers: customerContacts.filter(c => c.decisionMaker).length,
      influencers: customerContacts.filter(c => c.influencer).length,
      primaryContact: customerContacts.find(c => c.isPrimary) || null
    }
  });
});

export default router;
