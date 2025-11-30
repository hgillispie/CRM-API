// Mock sales team/users data for CRM
export const users = [
  {
    id: "user_001",
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@company.example.com",
    phone: "+1 (555) 100-0001",
    role: "Senior Account Executive",
    department: "Enterprise Sales",
    region: "West",
    territory: ["CA", "WA", "OR", "AZ", "NV"],
    manager: "user_005",
    hireDate: "2019-03-15",
    quota: {
      annual: 8000000,
      q1: 1800000,
      q2: 2000000,
      q3: 2000000,
      q4: 2200000
    },
    ytdAttainment: 92,
    performance: {
      winRate: 0.42,
      avgDealSize: 1250000,
      avgSalesCycle: 95,
      customerSatisfaction: 4.8
    },
    specializations: ["Manufacturing", "Energy", "Aerospace"],
    certifications: ["Enterprise Sales Certified", "Industry Expert - Manufacturing"],
    status: "Active",
    profileImage: "https://example.com/avatars/sarah-mitchell.jpg"
  },
  {
    id: "user_002",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@company.example.com",
    phone: "+1 (555) 100-0002",
    role: "Account Executive",
    department: "Mid-Market Sales",
    region: "West",
    territory: ["CA", "OR", "WA"],
    manager: "user_005",
    hireDate: "2021-06-01",
    quota: {
      annual: 4500000,
      q1: 1000000,
      q2: 1125000,
      q3: 1125000,
      q4: 1250000
    },
    ytdAttainment: 108,
    performance: {
      winRate: 0.38,
      avgDealSize: 320000,
      avgSalesCycle: 65,
      customerSatisfaction: 4.6
    },
    specializations: ["Technology", "SaaS", "Transportation"],
    certifications: ["Solution Sales Certified"],
    status: "Active",
    profileImage: "https://example.com/avatars/michael-chen.jpg"
  },
  {
    id: "user_003",
    firstName: "Jennifer",
    lastName: "Rodriguez",
    email: "jennifer.rodriguez@company.example.com",
    phone: "+1 (555) 100-0003",
    role: "Senior Account Executive",
    department: "Enterprise Sales",
    region: "Central",
    territory: ["IL", "MN", "WI", "MI", "IN", "OH"],
    manager: "user_005",
    hireDate: "2018-09-10",
    quota: {
      annual: 7500000,
      q1: 1700000,
      q2: 1875000,
      q3: 1875000,
      q4: 2050000
    },
    ytdAttainment: 85,
    performance: {
      winRate: 0.35,
      avgDealSize: 890000,
      avgSalesCycle: 110,
      customerSatisfaction: 4.7
    },
    specializations: ["Healthcare", "Retail", "Education"],
    certifications: ["Enterprise Sales Certified", "Healthcare Industry Expert"],
    status: "Active",
    profileImage: "https://example.com/avatars/jennifer-rodriguez.jpg"
  },
  {
    id: "user_004",
    firstName: "David",
    lastName: "Thompson",
    email: "david.thompson@company.example.com",
    phone: "+1 (555) 100-0004",
    role: "Senior Account Executive",
    department: "Enterprise Sales",
    region: "East",
    territory: ["NY", "NJ", "CT", "MA", "PA"],
    manager: "user_005",
    hireDate: "2017-02-20",
    quota: {
      annual: 9000000,
      q1: 2000000,
      q2: 2250000,
      q3: 2250000,
      q4: 2500000
    },
    ytdAttainment: 118,
    performance: {
      winRate: 0.45,
      avgDealSize: 1850000,
      avgSalesCycle: 120,
      customerSatisfaction: 4.9
    },
    specializations: ["Financial Services", "Professional Services"],
    certifications: ["Enterprise Sales Certified", "Financial Services Expert", "President's Club 2023"],
    status: "Active",
    profileImage: "https://example.com/avatars/david-thompson.jpg"
  },
  {
    id: "user_005",
    firstName: "Amanda",
    lastName: "Williams",
    email: "amanda.williams@company.example.com",
    phone: "+1 (555) 100-0005",
    role: "VP of Sales",
    department: "Sales Leadership",
    region: "National",
    territory: ["ALL"],
    manager: null,
    hireDate: "2016-01-05",
    quota: {
      annual: 35000000,
      q1: 8000000,
      q2: 8750000,
      q3: 8750000,
      q4: 9500000
    },
    ytdAttainment: 95,
    performance: {
      teamWinRate: 0.39,
      teamAvgDealSize: 980000,
      teamAvgSalesCycle: 92,
      teamCustomerSatisfaction: 4.7
    },
    specializations: ["Sales Leadership", "Enterprise Strategy"],
    certifications: ["Sales Leadership Certified", "Executive Presence"],
    status: "Active",
    profileImage: "https://example.com/avatars/amanda-williams.jpg"
  },
  {
    id: "user_006",
    firstName: "Robert",
    lastName: "Kim",
    email: "robert.kim@company.example.com",
    phone: "+1 (555) 100-0006",
    role: "Solutions Architect",
    department: "Sales Engineering",
    region: "National",
    territory: ["ALL"],
    manager: "user_007",
    hireDate: "2020-04-15",
    quota: null,
    ytdAttainment: null,
    performance: {
      technicalWinRate: 0.72,
      demosDelivered: 145,
      proofOfConcepts: 28,
      customerSatisfaction: 4.8
    },
    specializations: ["Platform Architecture", "Integration", "AI/ML"],
    certifications: ["Solutions Architect Professional", "AWS Certified", "Azure Certified"],
    status: "Active",
    profileImage: "https://example.com/avatars/robert-kim.jpg"
  },
  {
    id: "user_007",
    firstName: "Lisa",
    lastName: "Parker",
    email: "lisa.parker@company.example.com",
    phone: "+1 (555) 100-0007",
    role: "Director of Sales Engineering",
    department: "Sales Engineering",
    region: "National",
    territory: ["ALL"],
    manager: "user_005",
    hireDate: "2018-08-01",
    quota: null,
    ytdAttainment: null,
    performance: {
      teamTechnicalWinRate: 0.68,
      teamDemosDelivered: 580,
      teamProofOfConcepts: 95,
      customerSatisfaction: 4.7
    },
    specializations: ["Technical Sales Leadership", "Enterprise Architecture"],
    certifications: ["Sales Engineering Leader", "Technical Excellence Award 2023"],
    status: "Active",
    profileImage: "https://example.com/avatars/lisa-parker.jpg"
  },
  {
    id: "user_008",
    firstName: "Chris",
    lastName: "Martinez",
    email: "chris.martinez@company.example.com",
    phone: "+1 (555) 100-0008",
    role: "Business Development Rep",
    department: "Business Development",
    region: "West",
    territory: ["CA", "AZ", "NV"],
    manager: "user_009",
    hireDate: "2023-02-01",
    quota: {
      annualMeetings: 480,
      annualOpportunities: 96
    },
    ytdAttainment: 112,
    performance: {
      meetingsSet: 420,
      opportunitiesCreated: 84,
      showRate: 0.78,
      conversionRate: 0.20
    },
    specializations: ["Outbound Prospecting", "Technology Sector"],
    certifications: ["BDR Certified"],
    status: "Active",
    profileImage: "https://example.com/avatars/chris-martinez.jpg"
  },
  {
    id: "user_009",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@company.example.com",
    phone: "+1 (555) 100-0009",
    role: "Manager, Business Development",
    department: "Business Development",
    region: "National",
    territory: ["ALL"],
    manager: "user_005",
    hireDate: "2019-11-15",
    quota: {
      teamAnnualMeetings: 2400,
      teamAnnualOpportunities: 480
    },
    ytdAttainment: 98,
    performance: {
      teamMeetingsSet: 1850,
      teamOpportunitiesCreated: 368,
      teamShowRate: 0.75,
      teamConversionRate: 0.19
    },
    specializations: ["BDR Leadership", "Process Optimization"],
    certifications: ["BDR Management Certified"],
    status: "Active",
    profileImage: "https://example.com/avatars/emily-davis.jpg"
  },
  {
    id: "user_010",
    firstName: "Jason",
    lastName: "Lee",
    email: "jason.lee@company.example.com",
    phone: "+1 (555) 100-0010",
    role: "Customer Success Manager",
    department: "Customer Success",
    region: "West",
    territory: ["CA", "WA", "OR"],
    manager: "user_011",
    hireDate: "2021-03-01",
    quota: {
      renewalTarget: 4500000,
      nrrTarget: 110
    },
    ytdAttainment: 105,
    performance: {
      renewalRate: 0.94,
      nrr: 112,
      customerSatisfaction: 4.8,
      expansionRevenue: 680000
    },
    specializations: ["Customer Success", "Expansion Sales"],
    certifications: ["CSM Certified", "Gainsight Certified"],
    status: "Active",
    profileImage: "https://example.com/avatars/jason-lee.jpg"
  },
  {
    id: "user_011",
    firstName: "Rachel",
    lastName: "Brown",
    email: "rachel.brown@company.example.com",
    phone: "+1 (555) 100-0011",
    role: "Director of Customer Success",
    department: "Customer Success",
    region: "National",
    territory: ["ALL"],
    manager: "user_005",
    hireDate: "2019-05-20",
    quota: {
      teamRenewalTarget: 25000000,
      teamNrrTarget: 108
    },
    ytdAttainment: 102,
    performance: {
      teamRenewalRate: 0.92,
      teamNrr: 109,
      teamCustomerSatisfaction: 4.6,
      teamExpansionRevenue: 3200000
    },
    specializations: ["Customer Success Leadership", "Churn Prevention"],
    certifications: ["CS Leadership Certified"],
    status: "Active",
    profileImage: "https://example.com/avatars/rachel-brown.jpg"
  }
];

export default users;
