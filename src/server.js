import express from 'express';
import cors from 'cors';
import customersRouter from './routes/customers.js';
import contactsRouter from './routes/contacts.js';
import opportunitiesRouter from './routes/opportunities.js';
import activitiesRouter from './routes/activities.js';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import tasksRouter from './routes/tasks.js';
import notesRouter from './routes/notes.js';
import searchRouter from './routes/search.js';
import statsRouter from './routes/stats.js';

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

// API Routes
app.use('/api/customers', customersRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/opportunities', opportunitiesRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/notes', notesRouter);
app.use('/api/search', searchRouter);
app.use('/api/stats', statsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: "Mock CRM API",
    version: "1.0.0",
    description: "REST API providing mock CRM data for chatbot integration",
    endpoints: {
      customers: {
        "GET /api/customers": "List all customers with optional filters",
        "GET /api/customers/:id": "Get customer by ID",
        "GET /api/customers/:id/contacts": "Get contacts for a customer",
        "GET /api/customers/:id/opportunities": "Get opportunities for a customer",
        "GET /api/customers/:id/activities": "Get activities for a customer",
        "GET /api/customers/:id/notes": "Get notes for a customer",
        "GET /api/customers/:id/summary": "Get comprehensive customer summary"
      },
      contacts: {
        "GET /api/contacts": "List all contacts with optional filters",
        "GET /api/contacts/:id": "Get contact by ID"
      },
      opportunities: {
        "GET /api/opportunities": "List all opportunities with optional filters",
        "GET /api/opportunities/:id": "Get opportunity by ID",
        "GET /api/opportunities/pipeline": "Get pipeline summary by stage",
        "GET /api/opportunities/forecast": "Get sales forecast"
      },
      activities: {
        "GET /api/activities": "List all activities with optional filters",
        "GET /api/activities/:id": "Get activity by ID",
        "GET /api/activities/recent": "Get recent activities"
      },
      products: {
        "GET /api/products": "List all products",
        "GET /api/products/:id": "Get product by ID"
      },
      users: {
        "GET /api/users": "List all users (sales team)",
        "GET /api/users/:id": "Get user by ID",
        "GET /api/users/:id/performance": "Get user performance metrics"
      },
      tasks: {
        "GET /api/tasks": "List all tasks with optional filters",
        "GET /api/tasks/:id": "Get task by ID",
        "GET /api/tasks/due-soon": "Get tasks due within specified days"
      },
      notes: {
        "GET /api/notes": "List all notes",
        "GET /api/notes/:id": "Get note by ID"
      },
      search: {
        "GET /api/search": "Global search across all entities",
        "GET /api/search/customers": "Search customers",
        "GET /api/search/contacts": "Search contacts",
        "GET /api/search/opportunities": "Search opportunities"
      },
      stats: {
        "GET /api/stats/overview": "Get CRM overview statistics",
        "GET /api/stats/pipeline": "Get pipeline statistics",
        "GET /api/stats/performance": "Get team performance metrics",
        "GET /api/stats/renewals": "Get upcoming renewals"
      }
    },
    queryParameters: {
      common: ["limit", "offset", "sort", "order"],
      customers: ["industry", "status", "type", "owner", "minRevenue", "maxRevenue"],
      contacts: ["customerId", "decisionMaker", "department"],
      opportunities: ["stage", "owner", "customerId", "minAmount", "maxAmount", "forecastCategory"],
      activities: ["type", "customerId", "contactId", "outcome", "startDate", "endDate"],
      tasks: ["status", "priority", "assignee", "customerId", "dueBefore", "dueAfter"]
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: `Endpoint ${req.method} ${req.path} does not exist`,
    availableEndpoints: '/api'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    Mock CRM API Server                       ║
╠══════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}                    ║
║  API Documentation: http://localhost:${PORT}/api                ║
║  Health Check:      http://localhost:${PORT}/health             ║
╠══════════════════════════════════════════════════════════════╣
║  Available Endpoints:                                        ║
║  • /api/customers      - Customer/Account data               ║
║  • /api/contacts       - Contact data                        ║
║  • /api/opportunities  - Sales opportunities                 ║
║  • /api/activities     - Activity history                    ║
║  • /api/products       - Product catalog                     ║
║  • /api/users          - Sales team data                     ║
║  • /api/tasks          - Task management                     ║
║  • /api/notes          - Account notes                       ║
║  • /api/search         - Global search                       ║
║  • /api/stats          - Statistics & analytics              ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

export default app;
