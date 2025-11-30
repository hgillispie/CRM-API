import express from 'express';
import { customers } from '../data/customers.js';
import { contacts } from '../data/contacts.js';
import { opportunities } from '../data/opportunities.js';
import { activities } from '../data/activities.js';
import { tasks } from '../data/tasks.js';
import { users } from '../data/users.js';
import { statistics } from '../data/index.js';

const router = express.Router();

// GET /api/stats/overview - CRM overview statistics
router.get('/overview', (req, res) => {
  const openOpps = opportunities.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
  const closedWon = opportunities.filter(o => o.stage === 'Closed Won');
  const closedLost = opportunities.filter(o => o.stage === 'Closed Lost');
  
  res.json({
    customers: {
      total: customers.length,
      active: customers.filter(c => c.status === 'Active').length,
      atRisk: customers.filter(c => c.status === 'At Risk' || c.riskLevel === 'High').length,
      inactive: customers.filter(c => c.status === 'Inactive').length,
      byType: {
        enterprise: customers.filter(c => c.type === 'Enterprise').length,
        midMarket: customers.filter(c => c.type === 'Mid-Market').length,
        smallBusiness: customers.filter(c => c.type === 'Small Business').length
      },
      totalAnnualRevenue: customers.reduce((sum, c) => sum + c.annualRevenue, 0),
      totalLifetimeValue: customers.reduce((sum, c) => sum + c.lifetimeValue, 0)
    },
    contacts: {
      total: contacts.length,
      decisionMakers: contacts.filter(c => c.decisionMaker).length,
      influencers: contacts.filter(c => c.influencer).length
    },
    opportunities: {
      total: opportunities.length,
      open: openOpps.length,
      closedWon: closedWon.length,
      closedLost: closedLost.length,
      totalPipelineValue: openOpps.reduce((sum, o) => sum + o.amount, 0),
      weightedPipelineValue: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
      totalClosedWonValue: closedWon.reduce((sum, o) => sum + o.amount, 0),
      winRate: closedWon.length + closedLost.length > 0
        ? Math.round((closedWon.length / (closedWon.length + closedLost.length)) * 100)
        : 0,
      avgDealSize: openOpps.length > 0
        ? Math.round(openOpps.reduce((sum, o) => sum + o.amount, 0) / openOpps.length)
        : 0
    },
    activities: {
      total: activities.length,
      last7Days: activities.filter(a => {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return new Date(a.date) >= weekAgo;
      }).length,
      last30Days: activities.filter(a => {
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return new Date(a.date) >= monthAgo;
      }).length
    },
    tasks: {
      total: tasks.length,
      open: tasks.filter(t => t.status !== 'Completed').length,
      highPriority: tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length,
      overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length
    }
  });
});

// GET /api/stats/pipeline - Pipeline statistics
router.get('/pipeline', (req, res) => {
  const stages = ['Discovery', 'Qualification', 'Proposal', 'Negotiation'];
  
  const pipelineByStage = stages.map(stage => {
    const stageOpps = opportunities.filter(o => o.stage === stage);
    return {
      stage,
      count: stageOpps.length,
      value: stageOpps.reduce((sum, o) => sum + o.amount, 0),
      weightedValue: stageOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0),
      avgProbability: stageOpps.length > 0
        ? Math.round(stageOpps.reduce((sum, o) => sum + o.probability, 0) / stageOpps.length)
        : 0
    };
  });
  
  const byOwner = {};
  opportunities
    .filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage))
    .forEach(o => {
      if (!byOwner[o.owner]) {
        byOwner[o.owner] = { count: 0, value: 0, weighted: 0 };
      }
      byOwner[o.owner].count++;
      byOwner[o.owner].value += o.amount;
      byOwner[o.owner].weighted += o.amount * o.probability / 100;
    });
  
  const byForecast = {
    commit: opportunities.filter(o => o.forecastCategory === 'Commit').reduce((sum, o) => sum + o.amount, 0),
    bestCase: opportunities.filter(o => o.forecastCategory === 'Best Case').reduce((sum, o) => sum + o.amount, 0),
    pipeline: opportunities.filter(o => o.forecastCategory === 'Pipeline').reduce((sum, o) => sum + o.amount, 0)
  };
  
  res.json({
    byStage: pipelineByStage,
    byOwner,
    byForecast,
    totals: {
      totalPipeline: pipelineByStage.reduce((sum, s) => sum + s.value, 0),
      totalWeighted: pipelineByStage.reduce((sum, s) => sum + s.weightedValue, 0),
      totalOpportunities: pipelineByStage.reduce((sum, s) => sum + s.count, 0)
    }
  });
});

// GET /api/stats/performance - Team performance statistics
router.get('/performance', (req, res) => {
  const salesReps = users.filter(u => u.department.includes('Sales') && u.quota);
  
  const performance = salesReps.map(rep => {
    const repName = `${rep.firstName} ${rep.lastName}`;
    const repOpps = opportunities.filter(o => o.owner === repName);
    const openOpps = repOpps.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
    const closedWon = repOpps.filter(o => o.stage === 'Closed Won');
    const closedLost = repOpps.filter(o => o.stage === 'Closed Lost');
    
    const repActivities = activities.filter(a => a.owner === repName);
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentActivities = repActivities.filter(a => new Date(a.date) >= last30Days);
    
    return {
      id: rep.id,
      name: repName,
      role: rep.role,
      region: rep.region,
      quota: rep.quota?.annual || 0,
      ytdAttainment: rep.ytdAttainment,
      pipeline: {
        count: openOpps.length,
        value: openOpps.reduce((sum, o) => sum + o.amount, 0),
        weighted: openOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0)
      },
      closedWon: {
        count: closedWon.length,
        value: closedWon.reduce((sum, o) => sum + o.amount, 0)
      },
      winRate: closedWon.length + closedLost.length > 0
        ? Math.round((closedWon.length / (closedWon.length + closedLost.length)) * 100)
        : 0,
      activitiesLast30Days: recentActivities.length
    };
  });
  
  // Sort by attainment
  performance.sort((a, b) => (b.ytdAttainment || 0) - (a.ytdAttainment || 0));
  
  res.json({
    teamPerformance: performance,
    teamTotals: {
      totalQuota: performance.reduce((sum, p) => sum + p.quota, 0),
      totalPipeline: performance.reduce((sum, p) => sum + p.pipeline.value, 0),
      totalClosedWon: performance.reduce((sum, p) => sum + p.closedWon.value, 0),
      avgAttainment: Math.round(
        performance.reduce((sum, p) => sum + (p.ytdAttainment || 0), 0) / performance.length
      ),
      avgWinRate: Math.round(
        performance.reduce((sum, p) => sum + p.winRate, 0) / performance.length
      )
    }
  });
});

// GET /api/stats/renewals - Upcoming renewal statistics
router.get('/renewals', (req, res) => {
  const now = new Date();
  const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const in60Days = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  const in90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  
  const getUpcomingRenewals = (customers, beforeDate) => {
    return customers
      .filter(c => {
        const renewalDate = new Date(c.contractRenewalDate);
        return renewalDate >= now && renewalDate <= beforeDate;
      })
      .map(c => ({
        customerId: c.id,
        name: c.name,
        renewalDate: c.contractRenewalDate,
        lifetimeValue: c.lifetimeValue,
        healthScore: c.healthScore,
        riskLevel: c.riskLevel,
        accountOwner: c.accountOwner
      }))
      .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
  };
  
  const next30 = getUpcomingRenewals(customers, in30Days);
  const next60 = getUpcomingRenewals(customers, in60Days);
  const next90 = getUpcomingRenewals(customers, in90Days);
  
  res.json({
    summary: {
      next30Days: {
        count: next30.length,
        totalValue: next30.reduce((sum, c) => sum + c.lifetimeValue, 0),
        atRisk: next30.filter(c => c.riskLevel === 'High' || c.healthScore < 60).length
      },
      next60Days: {
        count: next60.length,
        totalValue: next60.reduce((sum, c) => sum + c.lifetimeValue, 0),
        atRisk: next60.filter(c => c.riskLevel === 'High' || c.healthScore < 60).length
      },
      next90Days: {
        count: next90.length,
        totalValue: next90.reduce((sum, c) => sum + c.lifetimeValue, 0),
        atRisk: next90.filter(c => c.riskLevel === 'High' || c.healthScore < 60).length
      }
    },
    renewals: next90
  });
});

// GET /api/stats/industry - Statistics by industry
router.get('/industry', (req, res) => {
  const industries = [...new Set(customers.map(c => c.industry))];
  
  const byIndustry = industries.map(industry => {
    const industryCustomers = customers.filter(c => c.industry === industry);
    const customerIds = industryCustomers.map(c => c.id);
    const industryOpps = opportunities.filter(o => customerIds.includes(o.customerId));
    const openOpps = industryOpps.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
    
    return {
      industry,
      customers: {
        count: industryCustomers.length,
        totalRevenue: industryCustomers.reduce((sum, c) => sum + c.annualRevenue, 0),
        avgHealthScore: Math.round(
          industryCustomers.reduce((sum, c) => sum + c.healthScore, 0) / industryCustomers.length
        )
      },
      opportunities: {
        open: openOpps.length,
        value: openOpps.reduce((sum, o) => sum + o.amount, 0)
      }
    };
  });
  
  // Sort by customer count
  byIndustry.sort((a, b) => b.customers.count - a.customers.count);
  
  res.json({ byIndustry });
});

// GET /api/stats/health - Customer health overview
router.get('/health', (req, res) => {
  const healthBuckets = {
    excellent: customers.filter(c => c.healthScore >= 90),
    good: customers.filter(c => c.healthScore >= 70 && c.healthScore < 90),
    fair: customers.filter(c => c.healthScore >= 50 && c.healthScore < 70),
    poor: customers.filter(c => c.healthScore < 50)
  };
  
  const formatBucket = (bucket) => ({
    count: bucket.length,
    customers: bucket.map(c => ({
      id: c.id,
      name: c.name,
      healthScore: c.healthScore,
      riskLevel: c.riskLevel,
      lifetimeValue: c.lifetimeValue
    }))
  });
  
  res.json({
    overview: {
      avgHealthScore: Math.round(
        customers.reduce((sum, c) => sum + c.healthScore, 0) / customers.length
      ),
      excellent: healthBuckets.excellent.length,
      good: healthBuckets.good.length,
      fair: healthBuckets.fair.length,
      poor: healthBuckets.poor.length
    },
    details: {
      excellent: formatBucket(healthBuckets.excellent),
      good: formatBucket(healthBuckets.good),
      fair: formatBucket(healthBuckets.fair),
      poor: formatBucket(healthBuckets.poor)
    },
    atRiskAccounts: customers
      .filter(c => c.riskLevel === 'High' || c.healthScore < 50)
      .map(c => ({
        id: c.id,
        name: c.name,
        healthScore: c.healthScore,
        riskLevel: c.riskLevel,
        contractRenewalDate: c.contractRenewalDate,
        lifetimeValue: c.lifetimeValue,
        accountOwner: c.accountOwner
      }))
  });
});

export default router;
