// Rich mock activity/interaction data for CRM
// Activities designed to support "activity summary" and engagement queries

export const activities = [
  // Recent RetailGiant activities
  {
    id: "act_001",
    customerId: "cust_001",
    customerName: "RetailGiant",
    contactId: "cont_001",
    contactName: "Jennifer Walsh",
    opportunityId: "opp_001",
    type: "meeting",
    subject: "Proposal Review Meeting",
    description: "Presented updated proposal to Jennifer Walsh (CDO). She's supportive and wants to move forward. Discussed implementation timeline and integration approach. Robert Chen (VP IT) joined for technical questions.",
    outcome: "Positive",
    date: "2024-11-29T14:00:00Z",
    duration: 60,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: ["Jennifer Walsh", "Robert Chen"],
    location: "Video Call - Zoom",
    nextSteps: "Prepare final presentation addressing Robert's integration concerns. Meeting scheduled for Dec 3.",
    createdAt: "2024-11-29T15:00:00Z",
    sentiment: "positive",
    tags: ["proposal", "executive", "technical"]
  },
  {
    id: "act_002",
    customerId: "cust_001",
    customerName: "RetailGiant",
    contactId: "cont_002",
    contactName: "Robert Chen",
    opportunityId: "opp_001",
    type: "demo",
    subject: "Technical Deep-Dive Demo",
    description: "Delivered technical demo focusing on API integration and data sync capabilities. Robert asked detailed questions about handling peak holiday traffic. Some concerns about integration timeline remain.",
    outcome: "Neutral",
    date: "2024-11-28T14:00:00Z",
    duration: 90,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: ["Robert Chen", "IT Team (3)"],
    location: "Video Call - Teams",
    nextSteps: "Prepare integration timeline document and reference architecture.",
    createdAt: "2024-11-28T16:00:00Z",
    sentiment: "neutral",
    tags: ["demo", "technical", "integration"]
  },
  
  // Recent HealthCare Pro activities
  {
    id: "act_003",
    customerId: "cust_002",
    customerName: "HealthCare Pro",
    contactId: "cont_003",
    contactName: "Dr. Amanda Foster",
    opportunityId: "opp_002",
    type: "call",
    subject: "Champion Check-in Call",
    description: "Weekly check-in with Dr. Foster. She's facing budget pushback from CFO Thomas Reed. Recent cost-cutting initiatives are affecting all new expenditures. She needs help building ROI case for the CFO.",
    outcome: "Action Required",
    date: "2024-11-28T16:30:00Z",
    duration: 30,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: ["Dr. Amanda Foster"],
    location: "Phone",
    nextSteps: "Prepare ROI documentation with patient retention metrics and operational efficiency data from current deployment.",
    createdAt: "2024-11-28T17:00:00Z",
    sentiment: "concerned",
    tags: ["champion", "budget-concern", "roi-needed"]
  },
  {
    id: "act_004",
    customerId: "cust_002",
    customerName: "HealthCare Pro",
    contactId: "cont_004",
    contactName: "Thomas Reed",
    opportunityId: "opp_002",
    type: "email",
    subject: "ROI Questions from CFO",
    description: "Received email from CFO Thomas Reed with detailed ROI questions. He wants to see: 1) Patient retention impact, 2) Operational cost savings, 3) Comparison to alternative solutions, 4) Implementation risk assessment.",
    outcome: "Action Required",
    date: "2024-11-20T14:00:00Z",
    duration: null,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: [],
    location: "Email",
    nextSteps: "Prepare comprehensive ROI analysis addressing all four areas.",
    createdAt: "2024-11-20T14:15:00Z",
    sentiment: "skeptical",
    tags: ["cfo", "roi", "budget-scrutiny"]
  },
  
  // Recent TechSolutions activities
  {
    id: "act_005",
    customerId: "cust_004",
    customerName: "TechSolutions",
    contactId: "cont_006",
    contactName: "David Kim",
    opportunityId: "opp_004",
    type: "meeting",
    subject: "Pricing Discussion",
    description: "Detailed pricing discussion with David Kim (CTO). He's comparing us against two competitors - CompetitorX (30% cheaper) and CompetitorY (similar price). Impressed with our API analytics but price is the main concern.",
    outcome: "Neutral",
    date: "2024-11-27T11:00:00Z",
    duration: 45,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: ["David Kim"],
    location: "Video Call - Zoom",
    nextSteps: "Prepare TCO comparison and multi-year discount proposal. Decision expected by Dec 10.",
    createdAt: "2024-11-27T12:00:00Z",
    sentiment: "cautious",
    tags: ["negotiation", "pricing", "competitive"]
  },
  {
    id: "act_006",
    customerId: "cust_004",
    customerName: "TechSolutions",
    contactId: "cont_006",
    contactName: "David Kim",
    opportunityId: "opp_004",
    type: "demo",
    subject: "API Analytics Deep-Dive",
    description: "Technical demo of our API analytics capabilities. David was very impressed - said it's significantly better than competitor offerings. This could be our key differentiator.",
    outcome: "Positive",
    date: "2024-11-22T15:00:00Z",
    duration: 60,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: ["David Kim", "Lead Engineer"],
    location: "Video Call - Zoom",
    nextSteps: "Send API documentation and analytics feature comparison.",
    createdAt: "2024-11-22T16:00:00Z",
    sentiment: "positive",
    tags: ["demo", "technical", "differentiator"]
  },
  
  // Recent Acme Corp activities
  {
    id: "act_007",
    customerId: "cust_003",
    customerName: "Acme Corp",
    contactId: "cont_005",
    contactName: "Michael Torres",
    opportunityId: "opp_003",
    type: "meeting",
    subject: "Contract Signing",
    description: "Contract signed! $75K deal closed. Michael Torres excited about implementation. Discussed expansion potential to 3 additional facilities. Implementation kickoff scheduled for Dec 5.",
    outcome: "Positive",
    date: "2024-11-20T15:00:00Z",
    duration: 30,
    owner: "Mike Johnson",
    ownerId: "user_002",
    attendees: ["Michael Torres"],
    location: "Video Call - Teams",
    nextSteps: "Schedule implementation kickoff for Dec 5. Prepare expansion discussion points.",
    createdAt: "2024-11-20T15:30:00Z",
    sentiment: "positive",
    tags: ["closed-won", "expansion-potential"]
  },
  {
    id: "act_008",
    customerId: "cust_003",
    customerName: "Acme Corp",
    contactId: "cont_005",
    contactName: "Michael Torres",
    opportunityId: "opp_003",
    type: "call",
    subject: "Pre-kickoff Planning",
    description: "Planning call for implementation kickoff. Michael confirmed key stakeholders for Dec 5 meeting. Discussed preliminary scope and timeline.",
    outcome: "Positive",
    date: "2024-11-25T10:00:00Z",
    duration: 25,
    owner: "Mike Johnson",
    ownerId: "user_002",
    attendees: ["Michael Torres"],
    location: "Phone",
    nextSteps: "Send kickoff agenda and pre-meeting materials.",
    createdAt: "2024-11-25T10:30:00Z",
    sentiment: "positive",
    tags: ["implementation", "kickoff-prep"]
  },
  
  // Recent Global Media activities
  {
    id: "act_009",
    customerId: "cust_005",
    customerName: "Global Media",
    contactId: "cont_008",
    contactName: "Marcus Williams",
    opportunityId: "opp_005",
    type: "call",
    subject: "Champion Strategy Discussion",
    description: "Strategy call with Marcus Williams (VP Analytics). He's trying to get us a meeting with CMO Sandra Hughes but it's been delayed. Need media industry case studies to help him build internal business case.",
    outcome: "Action Required",
    date: "2024-11-26T15:30:00Z",
    duration: 35,
    owner: "Mike Johnson",
    ownerId: "user_002",
    attendees: ["Marcus Williams"],
    location: "Phone",
    nextSteps: "Provide media industry case studies. Follow up on CMO intro next week.",
    createdAt: "2024-11-26T16:00:00Z",
    sentiment: "supportive",
    tags: ["champion", "case-studies-needed", "stakeholder-access"]
  },
  
  // MegaLogistics - At Risk activities
  {
    id: "act_010",
    customerId: "cust_008",
    customerName: "MegaLogistics",
    contactId: "cont_011",
    contactName: "Patricia Nguyen",
    opportunityId: "opp_007",
    type: "meeting",
    subject: "New VP Introduction",
    description: "First meeting with new VP of Operations Patricia Nguyen. She's re-evaluating all vendor relationships. Non-committal about renewal. Our previous champion John Smith left in September.",
    outcome: "Neutral",
    date: "2024-11-22T14:00:00Z",
    duration: 45,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: ["Patricia Nguyen"],
    location: "Video Call - Teams",
    nextSteps: "URGENT: Prepare value delivery report and schedule executive meeting ASAP.",
    createdAt: "2024-11-22T15:00:00Z",
    sentiment: "concerned",
    tags: ["at-risk", "leadership-change", "renewal"]
  },
  {
    id: "act_011",
    customerId: "cust_008",
    customerName: "MegaLogistics",
    contactId: "cont_012",
    contactName: "John Smith",
    opportunityId: "opp_007",
    type: "email",
    subject: "Champion Departure Notification",
    description: "Received notice that John Smith (our main champion) has left MegaLogistics. He moved to another company. Major risk to the renewal.",
    outcome: "Negative",
    date: "2024-09-15T09:00:00Z",
    duration: null,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: [],
    location: "Email",
    nextSteps: "Identify new champion, schedule meeting with replacement.",
    createdAt: "2024-09-15T09:30:00Z",
    sentiment: "alarming",
    tags: ["champion-loss", "risk", "renewal-threat"]
  },
  
  // FinanceFirst Bank activity
  {
    id: "act_012",
    customerId: "cust_006",
    customerName: "FinanceFirst Bank",
    contactId: "cont_010",
    contactName: "James Morrison",
    opportunityId: "opp_006",
    type: "meeting",
    subject: "Initial Discovery Meeting",
    description: "Discovery meeting with James Morrison (VP Technology). Discussed compliance requirements and regulatory challenges. Very process-oriented - needs extensive documentation before any decision can move forward.",
    outcome: "Neutral",
    date: "2024-11-20T09:00:00Z",
    duration: 60,
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    attendees: ["James Morrison", "Compliance Officer"],
    location: "FinanceFirst HQ",
    nextSteps: "Provide SOC2, security documentation, and compliance certifications.",
    createdAt: "2024-11-20T10:00:00Z",
    sentiment: "neutral",
    tags: ["discovery", "compliance", "early-stage"]
  }
];

// Activity summary for chatbot queries
export const activitySummary = {
  today: {
    date: "2024-11-30",
    scheduledActivities: [
      { time: "10:00 AM", type: "Call", customer: "MegaLogistics", task: "URGENT retention meeting", priority: "Critical" },
      { time: "2:00 PM", type: "Call", customer: "HealthCare Pro", task: "Address CFO concerns", priority: "High" }
    ],
    highPriorityTasks: [
      { customer: "TechSolutions", task: "Send pricing proposal follow-up", deadline: "Dec 2" },
      { customer: "RetailGiant", task: "Finalize presentation", deadline: "Dec 2" }
    ]
  },
  
  lastWeek: {
    totalActivities: 12,
    meetings: 5,
    calls: 4,
    emails: 2,
    demos: 1,
    outcomes: {
      positive: 5,
      neutral: 4,
      actionRequired: 2,
      negative: 1
    }
  },
  
  engagementByCustomer: [
    { customer: "RetailGiant", activitiesLast30Days: 8, trend: "increasing", sentiment: "positive" },
    { customer: "TechSolutions", activitiesLast30Days: 6, trend: "stable", sentiment: "neutral" },
    { customer: "HealthCare Pro", activitiesLast30Days: 5, trend: "stable", sentiment: "concerned" },
    { customer: "Acme Corp", activitiesLast30Days: 4, trend: "stable", sentiment: "positive" },
    { customer: "Global Media", activitiesLast30Days: 3, trend: "low", sentiment: "supportive" },
    { customer: "MegaLogistics", activitiesLast30Days: 2, trend: "declining", sentiment: "at-risk" }
  ]
};

export default activities;
