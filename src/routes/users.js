import express from 'express';
import { users } from '../data/users.js';
import { opportunities } from '../data/opportunities.js';
import { activities } from '../data/activities.js';
import { tasks } from '../data/tasks.js';

const router = express.Router();

// GET /api/users - List all users
router.get('/', (req, res) => {
  let filtered = [...users];
  
  // Apply filters
  if (req.query.role) {
    filtered = filtered.filter(u => 
      u.role.toLowerCase().includes(req.query.role.toLowerCase())
    );
  }
  if (req.query.department) {
    filtered = filtered.filter(u => 
      u.department.toLowerCase().includes(req.query.department.toLowerCase())
    );
  }
  if (req.query.region) {
    filtered = filtered.filter(u => 
      u.region.toLowerCase() === req.query.region.toLowerCase()
    );
  }
  
  res.json({
    data: filtered.map(u => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      role: u.role,
      department: u.department,
      region: u.region,
      status: u.status
    })),
    total: filtered.length
  });
});

// GET /api/users/sales-team - Get sales team with performance
router.get('/sales-team', (req, res) => {
  const salesTeam = users.filter(u => 
    u.department.includes('Sales') && u.quota
  );
  
  const teamData = salesTeam.map(user => {
    const userOpps = opportunities.filter(o => 
      o.owner.toLowerCase() === `${user.firstName} ${user.lastName}`.toLowerCase()
    );
    const openOpps = userOpps.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
    const closedWon = userOpps.filter(o => o.stage === 'Closed Won');
    
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      region: user.region,
      quota: user.quota,
      ytdAttainment: user.ytdAttainment,
      pipeline: {
        openOpportunities: openOpps.length,
        totalValue: openOpps.reduce((sum, o) => sum + o.amount, 0),
        weightedValue: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0)
      },
      closedWon: {
        count: closedWon.length,
        value: closedWon.reduce((sum, o) => sum + o.amount, 0)
      },
      performance: user.performance
    };
  });
  
  res.json({
    salesTeam: teamData,
    teamSummary: {
      totalQuota: salesTeam.reduce((sum, u) => sum + (u.quota?.annual || 0), 0),
      avgAttainment: Math.round(
        salesTeam.reduce((sum, u) => sum + (u.ytdAttainment || 0), 0) / salesTeam.length
      ),
      totalPipeline: teamData.reduce((sum, u) => sum + u.pipeline.totalValue, 0)
    }
  });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Get manager info
  const manager = user.manager 
    ? users.find(u => u.id === user.manager)
    : null;
  
  // Get direct reports
  const directReports = users.filter(u => u.manager === user.id);
  
  res.json({
    ...user,
    managerName: manager ? `${manager.firstName} ${manager.lastName}` : null,
    directReports: directReports.map(r => ({
      id: r.id,
      name: `${r.firstName} ${r.lastName}`,
      role: r.role
    }))
  });
});

// GET /api/users/:id/performance - Get user performance details
router.get('/:id/performance', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const userName = `${user.firstName} ${user.lastName}`;
  
  // Get opportunities
  const userOpps = opportunities.filter(o => 
    o.owner.toLowerCase() === userName.toLowerCase()
  );
  const openOpps = userOpps.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
  const closedWon = userOpps.filter(o => o.stage === 'Closed Won');
  const closedLost = userOpps.filter(o => o.stage === 'Closed Lost');
  
  // Get activities
  const userActivities = activities.filter(a => 
    a.owner.toLowerCase() === userName.toLowerCase()
  );
  const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentActivities = userActivities.filter(a => new Date(a.date) >= last30Days);
  
  // Get tasks
  const userTasks = tasks.filter(t => t.assignee === user.id);
  const openTasks = userTasks.filter(t => t.status !== 'Completed');
  
  res.json({
    user: {
      id: user.id,
      name: userName,
      role: user.role,
      region: user.region
    },
    quota: user.quota,
    attainment: user.ytdAttainment,
    pipeline: {
      openOpportunities: openOpps.length,
      totalValue: openOpps.reduce((sum, o) => sum + o.amount, 0),
      weightedValue: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
      byStage: {
        discovery: openOpps.filter(o => o.stage === 'Discovery').length,
        qualification: openOpps.filter(o => o.stage === 'Qualification').length,
        proposal: openOpps.filter(o => o.stage === 'Proposal').length,
        negotiation: openOpps.filter(o => o.stage === 'Negotiation').length
      }
    },
    closedDeals: {
      won: {
        count: closedWon.length,
        value: closedWon.reduce((sum, o) => sum + o.amount, 0)
      },
      lost: {
        count: closedLost.length,
        value: closedLost.reduce((sum, o) => sum + o.amount, 0)
      },
      winRate: userOpps.length > 0 
        ? Math.round((closedWon.length / (closedWon.length + closedLost.length)) * 100)
        : 0
    },
    activity: {
      last30Days: {
        total: recentActivities.length,
        meetings: recentActivities.filter(a => a.type === 'meeting').length,
        calls: recentActivities.filter(a => a.type === 'call').length,
        emails: recentActivities.filter(a => a.type === 'email').length,
        demos: recentActivities.filter(a => a.type === 'demo').length
      }
    },
    tasks: {
      open: openTasks.length,
      highPriority: openTasks.filter(t => t.priority === 'High').length,
      overdue: openTasks.filter(t => new Date(t.dueDate) < new Date()).length
    },
    metrics: user.performance
  });
});

export default router;
