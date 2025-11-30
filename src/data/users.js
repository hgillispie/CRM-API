// Mock sales team/users data for CRM
export const users = [
  {
    id: "user_001",
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@company.example.com",
    phone: "+1 (555) 100-0001",
    role: "Senior Account Executive",
    department: "Sales",
    region: "National",
    hireDate: "2022-03-15",
    quota: {
      annual: 1200000,
      q4: 350000
    },
    ytdClosed: 425000,
    ytdAttainment: 85,
    currentQuarter: {
      target: 350000,
      closed: 75000,  // Acme Corp closed by Mike, Sarah has different deals
      pipeline: 457500,  // RetailGiant + HealthCare Pro + TechSolutions + MegaLogistics
      attainment: 21
    },
    performance: {
      winRate: 33,
      avgDealSize: 95000,
      avgSalesCycle: 75,
      dealsInPipeline: 5
    },
    status: "Active"
  },
  {
    id: "user_002",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@company.example.com",
    phone: "+1 (555) 100-0002",
    role: "Account Executive",
    department: "Sales",
    region: "National",
    hireDate: "2023-01-10",
    quota: {
      annual: 800000,
      q4: 200000
    },
    ytdClosed: 280000,
    ytdAttainment: 70,
    currentQuarter: {
      target: 200000,
      closed: 75000,  // Acme Corp
      pipeline: 50000,  // Global Media
      attainment: 37.5
    },
    performance: {
      winRate: 28,
      avgDealSize: 65000,
      avgSalesCycle: 60,
      dealsInPipeline: 2
    },
    status: "Active"
  }
];

// Team metrics for chatbot queries
export const teamMetrics = {
  conversion: {
    currentRate: 28,
    previousQuarterRate: 33,
    change: -5,
    trend: "declining",
    factors: [
      "Increased competition in mid-market segment",
      "Longer decision cycles due to economic uncertainty",
      "Two deals lost to aggressive competitor pricing"
    ],
    recommendations: [
      "Improve early-stage qualification criteria",
      "Develop competitive battle cards",
      "Accelerate proof-of-value demonstrations",
      "Consider flexible pricing for strategic accounts"
    ]
  },
  
  teamPerformance: {
    totalQuota: 2000000,
    totalClosed: 705000,
    totalPipeline: 507500,
    avgWinRate: 30.5,
    avgDealSize: 97500
  }
};

export default users;
