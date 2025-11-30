import express from 'express';
import { tasks } from '../data/tasks.js';
import { customers } from '../data/customers.js';
import { users } from '../data/users.js';

const router = express.Router();

// GET /api/tasks - List all tasks with filters
router.get('/', (req, res) => {
  let filtered = [...tasks];
  
  // Apply filters
  if (req.query.status) {
    filtered = filtered.filter(t => 
      t.status.toLowerCase().replace(/\s+/g, '-') === req.query.status.toLowerCase().replace(/\s+/g, '-')
    );
  }
  if (req.query.priority) {
    filtered = filtered.filter(t => 
      t.priority.toLowerCase() === req.query.priority.toLowerCase()
    );
  }
  if (req.query.assignee) {
    filtered = filtered.filter(t => t.assignee === req.query.assignee);
  }
  if (req.query.customerId) {
    filtered = filtered.filter(t => t.customerId === req.query.customerId);
  }
  if (req.query.type) {
    filtered = filtered.filter(t => 
      t.type.toLowerCase() === req.query.type.toLowerCase()
    );
  }
  if (req.query.dueBefore) {
    filtered = filtered.filter(t => new Date(t.dueDate) <= new Date(req.query.dueBefore));
  }
  if (req.query.dueAfter) {
    filtered = filtered.filter(t => new Date(t.dueDate) >= new Date(req.query.dueAfter));
  }
  
  // Enrich with customer and assignee names
  const enriched = filtered.map(task => {
    const customer = task.customerId 
      ? customers.find(c => c.id === task.customerId)
      : null;
    const assignee = users.find(u => u.id === task.assignee);
    return {
      ...task,
      customerName: customer ? customer.name : null,
      assigneeName: assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unknown'
    };
  });
  
  // Sort by due date
  enriched.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
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
      pending: filtered.filter(t => t.status === 'Pending').length,
      inProgress: filtered.filter(t => t.status === 'In Progress').length,
      completed: filtered.filter(t => t.status === 'Completed').length,
      highPriority: filtered.filter(t => t.priority === 'High').length
    }
  });
});

// GET /api/tasks/due-soon - Get tasks due soon
router.get('/due-soon', (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  
  const dueSoon = tasks
    .filter(t => {
      const dueDate = new Date(t.dueDate);
      return dueDate >= now && dueDate <= futureDate && t.status !== 'Completed';
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .map(task => {
      const customer = task.customerId 
        ? customers.find(c => c.id === task.customerId)
        : null;
      const assignee = users.find(u => u.id === task.assignee);
      return {
        ...task,
        customerName: customer ? customer.name : null,
        assigneeName: assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unknown'
      };
    });
  
  res.json({
    timeframe: `Next ${days} days`,
    tasks: dueSoon,
    total: dueSoon.length,
    byPriority: {
      high: dueSoon.filter(t => t.priority === 'High').length,
      medium: dueSoon.filter(t => t.priority === 'Medium').length,
      low: dueSoon.filter(t => t.priority === 'Low').length
    }
  });
});

// GET /api/tasks/overdue - Get overdue tasks
router.get('/overdue', (req, res) => {
  const now = new Date();
  
  const overdue = tasks
    .filter(t => new Date(t.dueDate) < now && t.status !== 'Completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .map(task => {
      const customer = task.customerId 
        ? customers.find(c => c.id === task.customerId)
        : null;
      const assignee = users.find(u => u.id === task.assignee);
      const daysOverdue = Math.floor((now - new Date(task.dueDate)) / (24 * 60 * 60 * 1000));
      return {
        ...task,
        customerName: customer ? customer.name : null,
        assigneeName: assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unknown',
        daysOverdue
      };
    });
  
  res.json({
    tasks: overdue,
    total: overdue.length,
    byAssignee: overdue.reduce((acc, t) => {
      acc[t.assigneeName] = (acc[t.assigneeName] || 0) + 1;
      return acc;
    }, {})
  });
});

// GET /api/tasks/by-assignee/:assigneeId - Get tasks by assignee
router.get('/by-assignee/:assigneeId', (req, res) => {
  const user = users.find(u => u.id === req.params.assigneeId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const userTasks = tasks
    .filter(t => t.assignee === req.params.assigneeId)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .map(task => {
      const customer = task.customerId 
        ? customers.find(c => c.id === task.customerId)
        : null;
      return {
        ...task,
        customerName: customer ? customer.name : null
      };
    });
  
  const openTasks = userTasks.filter(t => t.status !== 'Completed');
  
  res.json({
    assignee: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`
    },
    tasks: userTasks,
    summary: {
      total: userTasks.length,
      open: openTasks.length,
      completed: userTasks.filter(t => t.status === 'Completed').length,
      highPriority: openTasks.filter(t => t.priority === 'High').length,
      dueSoon: openTasks.filter(t => {
        const daysUntilDue = (new Date(t.dueDate) - new Date()) / (24 * 60 * 60 * 1000);
        return daysUntilDue <= 7 && daysUntilDue >= 0;
      }).length
    }
  });
});

// GET /api/tasks/:id - Get task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const customer = task.customerId 
    ? customers.find(c => c.id === task.customerId)
    : null;
  const assignee = users.find(u => u.id === task.assignee);
  const createdBy = users.find(u => u.id === task.createdBy);
  
  res.json({
    ...task,
    customerName: customer ? customer.name : null,
    assigneeName: assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unknown',
    createdByName: createdBy ? `${createdBy.firstName} ${createdBy.lastName}` : 'Unknown'
  });
});

export default router;
