import express from 'express';
import { notes } from '../data/notes.js';
import { customers } from '../data/customers.js';
import { users } from '../data/users.js';

const router = express.Router();

// GET /api/notes - List all notes
router.get('/', (req, res) => {
  let filtered = [...notes];
  
  // Apply filters
  if (req.query.customerId) {
    filtered = filtered.filter(n => n.customerId === req.query.customerId);
  }
  if (req.query.opportunityId) {
    filtered = filtered.filter(n => n.opportunityId === req.query.opportunityId);
  }
  if (req.query.contactId) {
    filtered = filtered.filter(n => n.contactId === req.query.contactId);
  }
  if (req.query.author) {
    filtered = filtered.filter(n => n.author === req.query.author);
  }
  if (req.query.pinned === 'true') {
    filtered = filtered.filter(n => n.isPinned);
  }
  if (req.query.tags) {
    const searchTags = req.query.tags.toLowerCase().split(',');
    filtered = filtered.filter(n => 
      n.tags.some(tag => searchTags.includes(tag.toLowerCase()))
    );
  }
  
  // Enrich with names
  const enriched = filtered.map(note => {
    const customer = customers.find(c => c.id === note.customerId);
    const author = users.find(u => u.id === note.author);
    return {
      ...note,
      customerName: customer ? customer.name : 'Unknown',
      authorName: author ? `${author.firstName} ${author.lastName}` : 'Unknown'
    };
  });
  
  // Sort - pinned first, then by date
  enriched.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  
  res.json({
    data: enriched,
    total: filtered.length
  });
});

// GET /api/notes/pinned - Get all pinned notes
router.get('/pinned', (req, res) => {
  const pinnedNotes = notes
    .filter(n => n.isPinned)
    .map(note => {
      const customer = customers.find(c => c.id === note.customerId);
      const author = users.find(u => u.id === note.author);
      return {
        ...note,
        customerName: customer ? customer.name : 'Unknown',
        authorName: author ? `${author.firstName} ${author.lastName}` : 'Unknown'
      };
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
  res.json({
    data: pinnedNotes,
    total: pinnedNotes.length
  });
});

// GET /api/notes/:id - Get note by ID
router.get('/:id', (req, res) => {
  const note = notes.find(n => n.id === req.params.id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  const customer = customers.find(c => c.id === note.customerId);
  const author = users.find(u => u.id === note.author);
  
  res.json({
    ...note,
    customerName: customer ? customer.name : 'Unknown',
    authorName: author ? `${author.firstName} ${author.lastName}` : 'Unknown'
  });
});

export default router;
