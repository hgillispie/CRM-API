// Rich mock opportunity/deal data for CRM
// Designed to support chatbot queries about pipeline, deals, and negotiations
// Total pipeline: ~$487.5K across 5 main deals, avg deal size: ~$97.5K

export const opportunities = [
  // RetailGiant - Largest deal, Proposal stage
  {
    id: "opp_001",
    customerId: "cust_001",
    customerName: "RetailGiant",
    name: "Digital Commerce Platform",
    description: "Enterprise omnichannel commerce platform to unify RetailGiant's 350+ stores with their e-commerce presence. Includes inventory sync, unified customer profiles, and mobile POS integration.",
    stage: "Proposal",
    probability: 65,
    amount: 150000,
    currency: "USD",
    closeDate: "2024-12-20",
    expectedCloseDate: "2024-12-20",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "New Business",
    source: "Trade Show",
    primaryContactId: "cont_001",
    primaryContactName: "Jennifer Walsh",
    competitors: ["Salesforce Commerce", "Shopify Plus"],
    competitorAnalysis: "Salesforce is our main competitor - stronger brand but 40% more expensive. Shopify Plus is being considered for cost but lacks enterprise features we offer.",
    nextStep: "Final proposal presentation to CDO and VP IT next Tuesday",
    nextStepDate: "2024-12-03",
    createdAt: "2024-09-15T10:00:00Z",
    lastModified: "2024-11-29T14:00:00Z",
    lastActivityDate: "2024-11-29T14:00:00Z",
    forecastCategory: "Best Case",
    weightedAmount: 97500,
    products: [
      { name: "Commerce Platform License", quantity: 1, unitPrice: 85000 },
      { name: "Implementation Services", quantity: 1, unitPrice: 45000 },
      { name: "First Year Support", quantity: 1, unitPrice: 20000 }
    ],
    dealNotes: "Strong champion in Jennifer Walsh (CDO). Robert Chen (VP IT) has integration concerns we need to address. Budget is approved for Q4. Key differentiator: our API flexibility and faster implementation timeline.",
    risks: ["Integration complexity concerns from IT", "Competing priorities with holiday season"],
    strengths: ["Executive sponsorship", "Budget approved", "Technical fit validated"],
    tags: ["enterprise", "retail", "high-priority", "q4-close"]
  },
  
  // HealthCare Pro - High potential, Proposal stage with budget concerns
  {
    id: "opp_002",
    customerId: "cust_002",
    customerName: "HealthCare Pro",
    name: "Patient Engagement Platform Expansion",
    description: "Expansion of patient engagement platform to support HealthCare Pro's growth into 15 new hospital systems. The platform includes telehealth integration, appointment scheduling, patient portal, and HIPAA-compliant messaging. This deal is critical for their Q1 expansion plans.",
    stage: "Proposal",
    probability: 50,
    amount: 125000,
    currency: "USD",
    closeDate: "2024-12-15",
    expectedCloseDate: "2024-12-15",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "Expansion",
    source: "Existing Customer",
    primaryContactId: "cont_003",
    primaryContactName: "Dr. Amanda Foster",
    competitors: ["Epic MyChart", "Cerner Patient Portal"],
    competitorAnalysis: "Epic is the incumbent in some target hospitals but our solution offers better patient experience scores. Integration with their existing EHR is our key advantage.",
    nextStep: "Schedule call to address CFO budget concerns - need ROI documentation",
    nextStepDate: "2024-12-02",
    createdAt: "2024-08-20T09:00:00Z",
    lastModified: "2024-11-28T16:30:00Z",
    lastActivityDate: "2024-11-28T16:30:00Z",
    forecastCategory: "Pipeline",
    weightedAmount: 62500,
    products: [
      { name: "Patient Engagement Platform - Enterprise", quantity: 1, unitPrice: 75000 },
      { name: "Telehealth Module", quantity: 1, unitPrice: 25000 },
      { name: "Implementation & Training", quantity: 1, unitPrice: 20000 },
      { name: "Annual Support", quantity: 1, unitPrice: 5000 }
    ],
    dealNotes: "Dr. Amanda Foster is our champion and strongly advocates for the platform. However, CFO Thomas Reed is pushing back on budget due to recent cost-cutting initiatives. We need to provide stronger ROI justification - specifically around patient retention and operational efficiency gains. Dr. Foster mentioned that competitors are circling, so timing is important.",
    budgetContext: "HealthCare Pro recently announced cost-cutting measures. CFO is scrutinizing all new expenditures. Need to frame this as revenue-generating, not cost center.",
    championContext: "Dr. Foster sees this as essential for their hospital expansion. She's been our advocate for 6 months and has significant influence with the CEO.",
    risks: ["Budget scrutiny from CFO", "Competing priorities", "Complex multi-stakeholder approval"],
    strengths: ["Strong clinical champion", "Proven ROI from current deployment", "Strategic fit with expansion plans"],
    tags: ["healthcare", "expansion", "budget-concern", "champion-driven"]
  },
  
  // Acme Corp - Recently closed, implementation starting
  {
    id: "opp_003",
    customerId: "cust_003",
    customerName: "Acme Corp",
    name: "Manufacturing Operations Platform",
    description: "Core manufacturing operations platform for Acme Corp's main facility. Includes production scheduling, quality management, and supply chain visibility modules.",
    stage: "Closed Won",
    probability: 100,
    amount: 75000,
    currency: "USD",
    closeDate: "2024-11-20",
    expectedCloseDate: "2024-11-15",
    actualCloseDate: "2024-11-20",
    owner: "Mike Johnson",
    ownerId: "user_002",
    type: "New Business",
    source: "Referral",
    primaryContactId: "cont_005",
    primaryContactName: "Michael Torres",
    competitors: ["SAP", "Oracle"],
    nextStep: "Implementation kickoff scheduled for December 5",
    nextStepDate: "2024-12-05",
    createdAt: "2024-06-10T14:00:00Z",
    lastModified: "2024-11-20T15:00:00Z",
    lastActivityDate: "2024-11-25T10:00:00Z",
    forecastCategory: "Closed",
    weightedAmount: 75000,
    products: [
      { name: "Manufacturing Operations Platform", quantity: 1, unitPrice: 50000 },
      { name: "Implementation Services", quantity: 1, unitPrice: 20000 },
      { name: "First Year Support", quantity: 1, unitPrice: 5000 }
    ],
    dealNotes: "Successfully closed after 5-month sales cycle. Michael Torres is excited about implementation. High potential for expansion to their other 3 facilities - could be $200K+ additional revenue. Key win factor: our faster implementation timeline vs SAP (3 months vs 9 months).",
    winFactors: ["Faster implementation", "Better price point", "Strong reference from similar manufacturer"],
    expansionPotential: "3 additional facilities could represent $200K+ in expansion revenue over next 18 months",
    risks: [],
    strengths: ["Deal closed", "Expansion potential", "Strong champion"],
    tags: ["manufacturing", "closed-won", "expansion-potential"]
  },
  
  // TechSolutions - In negotiation, price sensitive
  {
    id: "opp_004",
    customerId: "cust_004",
    customerName: "TechSolutions",
    name: "Developer Platform Integration",
    description: "API management and developer portal platform to streamline TechSolutions' partner integrations. CTO David Kim is the key decision maker - technically impressed but concerned about pricing vs competitors.",
    stage: "Negotiation",
    probability: 60,
    amount: 87500,
    currency: "USD",
    closeDate: "2024-12-10",
    expectedCloseDate: "2024-12-10",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "New Business",
    source: "Inbound Lead",
    primaryContactId: "cont_006",
    primaryContactName: "David Kim",
    competitors: ["CompetitorX", "CompetitorY"],
    competitorAnalysis: "CompetitorX: 30% cheaper but missing key API analytics features. CompetitorY: Similar pricing but weaker documentation and support. Our advantages: superior API analytics, better developer experience, faster support response times.",
    nextStep: "Prepare detailed ROI analysis and competitive comparison for CTO",
    nextStepDate: "2024-12-02",
    createdAt: "2024-07-25T11:00:00Z",
    lastModified: "2024-11-27T11:15:00Z",
    lastActivityDate: "2024-11-27T11:15:00Z",
    forecastCategory: "Commit",
    weightedAmount: 52500,
    products: [
      { name: "API Management Platform", quantity: 1, unitPrice: 55000 },
      { name: "Developer Portal", quantity: 1, unitPrice: 20000 },
      { name: "Implementation", quantity: 1, unitPrice: 10000 },
      { name: "Annual Support", quantity: 1, unitPrice: 2500 }
    ],
    dealNotes: "David Kim (CTO) is impressed with our technical capabilities, especially our API analytics. However, he's comparing us against two competitors and is price sensitive. Lisa Park (CEO) will make final call but has delegated evaluation to David. Key negotiation points: 1) Highlight our superior developer experience, 2) Offer multi-year discount, 3) Emphasize support response time SLAs.",
    negotiationContext: {
      mainObjection: "Price compared to CompetitorX",
      proposedDiscount: "10% multi-year discount offered",
      keyDifferentiators: ["API analytics", "Developer experience", "Support SLAs"],
      decisionTimeline: "Decision expected by Dec 10",
      stakeholders: ["David Kim (CTO) - Technical evaluator", "Lisa Park (CEO) - Final approval"]
    },
    approachRecommendation: "Focus on total cost of ownership, not just license price. CompetitorX has hidden costs in implementation and support. Prepare detailed TCO comparison showing 3-year cost advantage. David responds well to technical depth - schedule demo of API analytics features he hasn't seen yet.",
    risks: ["Price sensitivity", "Active competitor evaluation", "Multiple decision makers"],
    strengths: ["Technical validation complete", "Strong product fit", "CTO engagement"],
    tags: ["saas", "negotiation", "competitive", "price-sensitive"]
  },
  
  // Global Media - Early stage, qualification
  {
    id: "opp_005",
    customerId: "cust_005",
    customerName: "Global Media",
    name: "Content Analytics Platform",
    description: "Enterprise analytics platform for content performance measurement and audience insights. Large potential deal but early stage with complex stakeholder landscape.",
    stage: "Qualification",
    probability: 25,
    amount: 50000,
    currency: "USD",
    closeDate: "2025-02-28",
    expectedCloseDate: "2025-02-28",
    owner: "Mike Johnson",
    ownerId: "user_002",
    type: "New Business",
    source: "Cold Outreach",
    primaryContactId: "cont_008",
    primaryContactName: "Marcus Williams",
    competitors: ["Google Analytics 360", "Adobe Analytics"],
    competitorAnalysis: "Google and Adobe are entrenched but our media-specific features (content attribution, audience segments) are superior for their use case.",
    nextStep: "Get meeting with CMO Sandra Hughes - Marcus is trying to arrange introduction",
    nextStepDate: "2024-12-06",
    createdAt: "2024-10-01T08:45:00Z",
    lastModified: "2024-11-26T15:30:00Z",
    lastActivityDate: "2024-11-26T15:30:00Z",
    forecastCategory: "Pipeline",
    weightedAmount: 12500,
    products: [
      { name: "Content Analytics Platform", quantity: 1, unitPrice: 35000 },
      { name: "Implementation", quantity: 1, unitPrice: 10000 },
      { name: "Annual Support", quantity: 1, unitPrice: 5000 }
    ],
    dealNotes: "Marcus Williams (VP Analytics) is our internal champion but is not the decision maker. Need to get to Sandra Hughes (CMO) who controls budget. Complex enterprise sale with multiple stakeholders. Marcus is looking for media industry case studies to build internal business case.",
    risks: ["Early stage", "No access to decision maker yet", "Complex stakeholder map", "Long sales cycle expected"],
    strengths: ["Internal champion identified", "Strong product fit for media", "Large expansion potential"],
    tags: ["media", "enterprise", "early-stage", "complex-sale"]
  },
  
  // Additional historical/context deals for richer data
  
  // FinanceFirst Bank - Early qualification, compliance focused
  {
    id: "opp_006",
    customerId: "cust_006",
    customerName: "FinanceFirst Bank",
    name: "Compliance Automation Platform",
    description: "Regulatory compliance automation for banking operations. Long sales cycle expected due to compliance requirements.",
    stage: "Qualification",
    probability: 15,
    amount: 200000,
    currency: "USD",
    closeDate: "2025-06-30",
    expectedCloseDate: "2025-06-30",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "New Business",
    source: "Conference",
    primaryContactId: "cont_010",
    primaryContactName: "James Morrison",
    competitors: ["FIS", "Temenos"],
    nextStep: "Provide SOC2 and compliance documentation",
    nextStepDate: "2024-12-15",
    createdAt: "2024-09-20T10:00:00Z",
    lastModified: "2024-11-20T09:00:00Z",
    lastActivityDate: "2024-11-20T09:00:00Z",
    forecastCategory: "Pipeline",
    weightedAmount: 30000,
    products: [
      { name: "Compliance Platform", quantity: 1, unitPrice: 150000 },
      { name: "Implementation", quantity: 1, unitPrice: 40000 },
      { name: "Annual Support", quantity: 1, unitPrice: 10000 }
    ],
    dealNotes: "Very early stage. Compliance review will take 3-6 months. James is interested but can't move forward without security documentation.",
    risks: ["Long compliance cycle", "Low engagement", "Many competitors"],
    strengths: ["Large deal potential", "Strategic vertical"],
    tags: ["financial-services", "compliance", "long-cycle"]
  },
  
  // MegaLogistics - AT RISK renewal
  {
    id: "opp_007",
    customerId: "cust_008",
    customerName: "MegaLogistics",
    name: "Platform Renewal 2025",
    description: "Annual platform renewal for existing customer. AT RISK due to leadership change - our champion left and new VP is re-evaluating all vendors.",
    stage: "Negotiation",
    probability: 40,
    amount: 95000,
    currency: "USD",
    closeDate: "2025-01-31",
    expectedCloseDate: "2025-01-31",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "Renewal",
    source: "Existing Customer",
    primaryContactId: "cont_011",
    primaryContactName: "Patricia Nguyen",
    competitors: ["project44", "FourKites"],
    competitorAnalysis: "Competitors are actively approaching Patricia. project44 offering aggressive pricing to win the account.",
    nextStep: "URGENT: Schedule executive meeting to demonstrate value delivered",
    nextStepDate: "2024-12-01",
    createdAt: "2024-10-15T09:00:00Z",
    lastModified: "2024-11-22T14:00:00Z",
    lastActivityDate: "2024-11-22T14:00:00Z",
    forecastCategory: "Pipeline",
    weightedAmount: 38000,
    atRisk: true,
    riskReason: "Leadership change - new VP Patricia Nguyen is re-evaluating all vendor relationships. Our previous champion John Smith left the company.",
    products: [
      { name: "Logistics Platform Renewal", quantity: 1, unitPrice: 85000 },
      { name: "Support Renewal", quantity: 1, unitPrice: 10000 }
    ],
    dealNotes: "CRITICAL AT-RISK RENEWAL. John Smith (our champion) left in September. New VP Patricia Nguyen started 2 months ago and is reviewing all vendors. Competitors are circling. Need to demonstrate value delivered over past year and build relationship with Patricia ASAP.",
    risks: ["Leadership change", "Lost champion", "Active competitor pursuit", "Contract expires in 60 days"],
    strengths: ["Proven value delivery", "Switching costs for customer", "Good product performance"],
    tags: ["renewal", "at-risk", "urgent", "logistics"]
  },
  
  // Lost deal for conversion context
  {
    id: "opp_008",
    customerId: "cust_007",
    customerName: "StartupXYZ",
    name: "Growth Platform",
    description: "SaaS platform for startup operations. Lost to competitor on price.",
    stage: "Closed Lost",
    probability: 0,
    amount: 25000,
    currency: "USD",
    closeDate: "2024-10-15",
    actualCloseDate: "2024-10-15",
    owner: "Mike Johnson",
    ownerId: "user_002",
    type: "New Business",
    source: "Inbound Lead",
    primaryContactId: null,
    competitors: ["LowerCostCompetitor"],
    nextStep: null,
    createdAt: "2024-07-01T14:00:00Z",
    lastModified: "2024-10-15T11:30:00Z",
    forecastCategory: "Omitted",
    lossReason: "Price - startup chose lower-cost competitor that better fit their budget constraints",
    lossAnalysis: "Deal lost primarily on price. Startup had limited budget and competitor offered 50% lower price point. Our enterprise features were overkill for their current stage. Lesson: better qualify budget early in sales cycle.",
    products: [
      { name: "Growth Platform", quantity: 1, unitPrice: 20000 },
      { name: "Implementation", quantity: 1, unitPrice: 5000 }
    ],
    tags: ["lost", "startup", "price-sensitive"]
  },
  
  // 10 NEW OPPORTUNITIES
  
  // EduLearn Academy
  {
    id: "opp_009",
    customerId: "cust_009",
    customerName: "EduLearn Academy",
    name: "Student Analytics Platform",
    description: "Analytics platform for tracking student engagement and learning outcomes across K-12 and higher education courses.",
    stage: "Proposal",
    probability: 70,
    amount: 85000,
    currency: "USD",
    closeDate: "2025-01-15",
    expectedCloseDate: "2025-01-15",
    owner: "Mike Johnson",
    ownerId: "user_002",
    type: "New Business",
    source: "Inbound Lead",
    primaryContactId: "cont_013",
    primaryContactName: "Rachel Green",
    competitors: ["Instructure", "Blackboard"],
    nextStep: "Schedule implementation planning session",
    nextStepDate: "2024-12-05",
    createdAt: "2024-08-15T10:00:00Z",
    lastModified: "2024-11-28T11:00:00Z",
    forecastCategory: "Commit",
    weightedAmount: 59500,
    products: [
      { name: "Analytics Platform - Education", quantity: 1, unitPrice: 60000 },
      { name: "Implementation", quantity: 1, unitPrice: 20000 },
      { name: "Training", quantity: 1, unitPrice: 5000 }
    ],
    dealNotes: "Strong champion in Rachel Green (CTO). Budget approved for Q1. Technical evaluation complete. Just finalizing implementation timeline.",
    risks: ["Q1 budget timing"],
    strengths: ["Strong champion", "Budget approved", "Technical fit"],
    tags: ["education", "analytics", "commit"]
  },
  
  // GreenEnergy Solutions
  {
    id: "opp_010",
    customerId: "cust_010",
    customerName: "GreenEnergy Solutions",
    name: "Asset Management Platform",
    description: "Platform for managing solar and wind energy assets, project tracking, and sustainability reporting.",
    stage: "Negotiation",
    probability: 75,
    amount: 110000,
    currency: "USD",
    closeDate: "2024-12-20",
    expectedCloseDate: "2024-12-20",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "New Business",
    source: "Conference",
    primaryContactId: "cont_014",
    primaryContactName: "Carlos Rivera",
    competitors: ["Sitetracker", "Procore"],
    nextStep: "Legal contract review",
    nextStepDate: "2024-12-03",
    createdAt: "2024-07-20T09:30:00Z",
    lastModified: "2024-11-27T14:00:00Z",
    forecastCategory: "Commit",
    weightedAmount: 82500,
    products: [
      { name: "Asset Management Platform", quantity: 1, unitPrice: 75000 },
      { name: "Project Tracking Module", quantity: 1, unitPrice: 25000 },
      { name: "Implementation", quantity: 1, unitPrice: 10000 }
    ],
    dealNotes: "In final legal review. Carlos is pushing hard to close before year-end for budget reasons. Strong sustainability focus aligns with our platform.",
    risks: ["Year-end timing pressure"],
    strengths: ["Strong champion", "Aligned priorities", "Competitive win"],
    tags: ["energy", "sustainability", "q4-close"]
  },
  
  // PharmaCore Labs
  {
    id: "opp_011",
    customerId: "cust_011",
    customerName: "PharmaCore Labs",
    name: "Clinical Research Platform",
    description: "Enterprise platform for clinical trial management and regulatory compliance. Very large deal with long sales cycle.",
    stage: "Discovery",
    probability: 20,
    amount: 450000,
    currency: "USD",
    closeDate: "2025-06-30",
    expectedCloseDate: "2025-06-30",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "New Business",
    source: "Referral",
    primaryContactId: "cont_015",
    primaryContactName: "Dr. Elizabeth Warren",
    competitors: ["Veeva", "Medidata"],
    nextStep: "Complete vendor security assessment",
    nextStepDate: "2024-12-15",
    createdAt: "2024-09-01T08:00:00Z",
    lastModified: "2024-11-25T10:30:00Z",
    forecastCategory: "Pipeline",
    weightedAmount: 90000,
    products: [
      { name: "Clinical Research Platform", quantity: 1, unitPrice: 350000 },
      { name: "Compliance Module", quantity: 1, unitPrice: 75000 },
      { name: "Implementation", quantity: 1, unitPrice: 25000 }
    ],
    dealNotes: "Very large opportunity but early stage. Complex compliance requirements. Dr. Warren is thorough evaluator - need extensive documentation.",
    risks: ["Long sales cycle", "Complex compliance", "Strong competitors"],
    strengths: ["Large deal potential", "Reference customer potential"],
    tags: ["pharma", "enterprise", "long-cycle", "high-value"]
  },
  
  // QuickServe Restaurants
  {
    id: "opp_012",
    customerId: "cust_012",
    customerName: "QuickServe Restaurants",
    name: "Supply Chain & Inventory Platform",
    description: "Inventory management and supply chain solution for 500+ restaurant locations. Urgent due to legacy system EOL.",
    stage: "Proposal",
    probability: 80,
    amount: 175000,
    currency: "USD",
    closeDate: "2024-12-15",
    expectedCloseDate: "2024-12-15",
    owner: "Mike Johnson",
    ownerId: "user_002",
    type: "New Business",
    source: "Trade Show",
    primaryContactId: "cont_016",
    primaryContactName: "Tony Martinez",
    competitors: ["Oracle", "Restaurant365"],
    nextStep: "Pilot program kickoff for 10 locations",
    nextStepDate: "2024-12-02",
    createdAt: "2024-08-01T11:00:00Z",
    lastModified: "2024-11-29T09:00:00Z",
    forecastCategory: "Commit",
    weightedAmount: 140000,
    products: [
      { name: "Inventory Management Platform", quantity: 1, unitPrice: 100000 },
      { name: "Supply Chain Module", quantity: 1, unitPrice: 50000 },
      { name: "Implementation - Pilot", quantity: 1, unitPrice: 25000 }
    ],
    dealNotes: "Urgent need - legacy system EOL in Q1. Tony is fast mover, very engaged. Pilot starting with 10 locations, full rollout after validation.",
    risks: ["Aggressive timeline"],
    strengths: ["Urgent need", "Strong champion", "Fast decision maker"],
    tags: ["restaurant", "urgent", "pilot", "enterprise"]
  },
  
  // SecureNet Cyber
  {
    id: "opp_013",
    customerId: "cust_013",
    customerName: "SecureNet Cyber",
    name: "SOC Automation Platform",
    description: "Security operations center automation and threat intelligence platform.",
    stage: "Negotiation",
    probability: 70,
    amount: 95000,
    currency: "USD",
    closeDate: "2024-12-18",
    expectedCloseDate: "2024-12-18",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "New Business",
    source: "Partner Referral",
    primaryContactId: "cont_017",
    primaryContactName: "Alex Chen",
    competitors: ["Splunk", "Palo Alto"],
    nextStep: "Final procurement approval",
    nextStepDate: "2024-12-05",
    createdAt: "2024-09-15T14:00:00Z",
    lastModified: "2024-11-28T15:30:00Z",
    forecastCategory: "Commit",
    weightedAmount: 66500,
    products: [
      { name: "SOC Platform", quantity: 1, unitPrice: 70000 },
      { name: "Threat Intelligence Feed", quantity: 1, unitPrice: 15000 },
      { name: "Implementation", quantity: 1, unitPrice: 10000 }
    ],
    dealNotes: "Technical evaluation complete - Alex loves the product. In procurement now. Strong technical fit for their SOC needs.",
    risks: ["Procurement process"],
    strengths: ["Technical champion", "Strong product fit", "Fast growing customer"],
    tags: ["cybersecurity", "technical-sale", "commit"]
  },
  
  // AutoParts Direct
  {
    id: "opp_014",
    customerId: "cust_014",
    customerName: "AutoParts Direct",
    name: "Warehouse Management System",
    description: "Inventory and warehouse management for 50 distribution centers nationwide.",
    stage: "Proposal",
    probability: 50,
    amount: 135000,
    currency: "USD",
    closeDate: "2025-01-31",
    expectedCloseDate: "2025-01-31",
    owner: "Mike Johnson",
    ownerId: "user_002",
    type: "New Business",
    source: "Cold Outreach",
    primaryContactId: "cont_018",
    primaryContactName: "Brian Thompson",
    competitors: ["Manhattan Associates", "Blue Yonder"],
    nextStep: "ROI presentation to CFO",
    nextStepDate: "2024-12-10",
    createdAt: "2024-10-01T10:00:00Z",
    lastModified: "2024-11-26T13:00:00Z",
    forecastCategory: "Pipeline",
    weightedAmount: 67500,
    products: [
      { name: "Warehouse Management System", quantity: 1, unitPrice: 90000 },
      { name: "E-commerce Integration", quantity: 1, unitPrice: 30000 },
      { name: "Implementation", quantity: 1, unitPrice: 15000 }
    ],
    dealNotes: "Brian is champion but needs CFO approval. Legacy system is painful - strong business case for modernization. ROI presentation key to moving forward.",
    risks: ["CFO approval needed", "Strong competitors"],
    strengths: ["Pain with legacy system", "Strong champion"],
    tags: ["automotive", "distribution", "legacy-replacement"]
  },
  
  // CloudFirst Solutions
  {
    id: "opp_015",
    customerId: "cust_015",
    customerName: "CloudFirst Solutions",
    name: "Project Management Suite",
    description: "Project management and resource planning for cloud consulting firm.",
    stage: "Negotiation",
    probability: 90,
    amount: 28000,
    currency: "USD",
    closeDate: "2024-12-05",
    expectedCloseDate: "2024-12-05",
    owner: "Mike Johnson",
    ownerId: "user_002",
    type: "New Business",
    source: "Inbound Lead",
    primaryContactId: "cont_019",
    primaryContactName: "Nina Patel",
    competitors: ["Monday.com", "Asana"],
    nextStep: "Contract signature",
    nextStepDate: "2024-12-02",
    createdAt: "2024-10-15T09:00:00Z",
    lastModified: "2024-11-29T10:00:00Z",
    forecastCategory: "Commit",
    weightedAmount: 25200,
    products: [
      { name: "Project Management Suite", quantity: 1, unitPrice: 20000 },
      { name: "Resource Planning Add-on", quantity: 1, unitPrice: 5000 },
      { name: "Setup & Training", quantity: 1, unitPrice: 3000 }
    ],
    dealNotes: "Ready to sign. Nina is fast decision maker. Small deal but good expansion potential as they grow. Contract being finalized.",
    risks: [],
    strengths: ["Fast decision maker", "Ready to close", "Expansion potential"],
    tags: ["small-business", "quick-close", "commit"]
  },
  
  // National Insurance Group
  {
    id: "opp_016",
    customerId: "cust_016",
    customerName: "National Insurance Group",
    name: "Claims Management Platform",
    description: "Enterprise claims automation and customer portal for major insurance carrier.",
    stage: "Qualification",
    probability: 15,
    amount: 380000,
    currency: "USD",
    closeDate: "2025-06-30",
    expectedCloseDate: "2025-06-30",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "New Business",
    source: "RFP Response",
    primaryContactId: "cont_020",
    primaryContactName: "Margaret Collins",
    competitors: ["Guidewire", "Duck Creek"],
    nextStep: "Stakeholder mapping and engagement",
    nextStepDate: "2024-12-10",
    createdAt: "2024-08-20T08:30:00Z",
    lastModified: "2024-11-24T11:00:00Z",
    forecastCategory: "Pipeline",
    weightedAmount: 57000,
    products: [
      { name: "Claims Platform", quantity: 1, unitPrice: 280000 },
      { name: "Customer Portal", quantity: 1, unitPrice: 60000 },
      { name: "Implementation", quantity: 1, unitPrice: 40000 }
    ],
    dealNotes: "Very large opportunity but complex stakeholder landscape. Margaret is operational contact but need to get to CFO and CIO for budget. Long sales cycle expected.",
    risks: ["Complex procurement", "Long cycle", "Need executive access"],
    strengths: ["Large deal", "Strategic vertical"],
    tags: ["insurance", "enterprise", "complex-sale"]
  },
  
  // FreshMart Grocers
  {
    id: "opp_017",
    customerId: "cust_017",
    customerName: "FreshMart Grocers",
    name: "Loyalty & Inventory Platform",
    description: "Customer loyalty program and inventory management for 75-store grocery chain.",
    stage: "Proposal",
    probability: 60,
    amount: 92000,
    currency: "USD",
    closeDate: "2025-01-15",
    expectedCloseDate: "2025-01-15",
    owner: "Mike Johnson",
    ownerId: "user_002",
    type: "New Business",
    source: "Conference",
    primaryContactId: "cont_021",
    primaryContactName: "Steve Anderson",
    competitors: ["PAR Technology", "NCR"],
    nextStep: "Technical architecture review",
    nextStepDate: "2024-12-06",
    createdAt: "2024-09-20T11:30:00Z",
    lastModified: "2024-11-27T16:00:00Z",
    forecastCategory: "Pipeline",
    weightedAmount: 55200,
    products: [
      { name: "Loyalty Platform", quantity: 1, unitPrice: 50000 },
      { name: "Inventory Module", quantity: 1, unitPrice: 30000 },
      { name: "Implementation", quantity: 1, unitPrice: 12000 }
    ],
    dealNotes: "Budget approved. Steve is technical champion running evaluation. In technical deep-dive phase. CIO trusts Steve's recommendations.",
    risks: ["Technical validation in progress"],
    strengths: ["Budget approved", "Strong champion", "CIO support"],
    tags: ["grocery", "retail", "loyalty"]
  },
  
  // BuildWell Construction (At Risk Renewal)
  {
    id: "opp_018",
    customerId: "cust_018",
    customerName: "BuildWell Construction",
    name: "Platform Renewal 2025",
    description: "Annual renewal at risk due to performance concerns and strained relationship.",
    stage: "Negotiation",
    probability: 35,
    amount: 72000,
    currency: "USD",
    closeDate: "2025-02-28",
    expectedCloseDate: "2025-02-28",
    owner: "Sarah Mitchell",
    ownerId: "user_001",
    type: "Renewal",
    source: "Existing Customer",
    primaryContactId: "cont_022",
    primaryContactName: "Kevin O'Brien",
    competitors: ["Procore", "Buildertrend"],
    nextStep: "Executive business review to address concerns",
    nextStepDate: "2024-12-05",
    createdAt: "2024-10-01T09:00:00Z",
    lastModified: "2024-11-20T14:30:00Z",
    atRisk: true,
    riskReason: "Performance complaints and low engagement. Kevin was champion but relationship has deteriorated.",
    forecastCategory: "Pipeline",
    weightedAmount: 25200,
    products: [
      { name: "Platform Renewal", quantity: 1, unitPrice: 65000 },
      { name: "Support Renewal", quantity: 1, unitPrice: 7000 }
    ],
    dealNotes: "AT RISK RENEWAL. Kevin frustrated with platform performance on recent projects. Competitors are approaching. Need executive intervention to save.",
    risks: ["Performance issues", "Frustrated contact", "Competitor activity", "Renewal in 90 days"],
    strengths: ["Existing relationship", "Switching costs"],
    tags: ["construction", "at-risk", "renewal", "urgent"]
  }
];

// Pipeline metrics for chatbot queries
export const pipelineMetrics = {
  // Current quarter deals (the 5 main active deals)
  currentQuarter: {
    totalDeals: 5,
    totalValue: 487500, // RetailGiant 150K + HealthCare Pro 125K + Acme 75K + TechSolutions 87.5K + Global Media 50K
    averageDealSize: 97500,
    weightedPipeline: 300000,
    byStage: {
      qualification: { count: 1, value: 50000 },      // Global Media
      proposal: { count: 2, value: 275000 },          // RetailGiant, HealthCare Pro  
      negotiation: { count: 1, value: 87500 },        // TechSolutions
      closedWon: { count: 1, value: 75000 }           // Acme Corp
    }
  },
  
  // Conversion metrics (for "conversion rate decline" query)
  conversion: {
    currentRate: 28,
    previousRate: 33,
    change: -5,
    trend: "declining",
    periodComparison: "vs last quarter",
    analysis: "Conversion rate dropped from 33% to 28% this quarter. Primary factors: 1) Increased competition in mid-market segment, 2) Longer decision cycles due to economic uncertainty, 3) Two deals lost to aggressive competitor pricing.",
    recommendations: [
      "Improve early-stage qualification to focus on higher-probability deals",
      "Develop competitive battle cards for top 3 competitors",
      "Accelerate time-to-value demonstrations",
      "Consider flexible pricing for strategic accounts"
    ]
  },

  // Top deals by value (for ranking queries)
  topDealsByValue: [
    { rank: 1, customer: "RetailGiant", deal: "Digital Commerce Platform", value: 150000, stage: "Proposal" },
    { rank: 2, customer: "HealthCare Pro", deal: "Patient Engagement Platform Expansion", value: 125000, stage: "Proposal" },
    { rank: 3, customer: "TechSolutions", deal: "Developer Platform Integration", value: 87500, stage: "Negotiation" },
    { rank: 4, customer: "Acme Corp", deal: "Manufacturing Operations Platform", value: 75000, stage: "Closed Won" },
    { rank: 5, customer: "Global Media", deal: "Content Analytics Platform", value: 50000, stage: "Qualification" }
  ],

  // Deals closest to closing (for "closest to closing" query)
  closestToClosing: [
    { customer: "Acme Corp", deal: "Manufacturing Operations Platform", stage: "Closed Won", probability: 100, closeDate: "2024-11-20", status: "Won" },
    { customer: "TechSolutions", deal: "Developer Platform Integration", stage: "Negotiation", probability: 60, closeDate: "2024-12-10", daysToClose: 10 },
    { customer: "HealthCare Pro", deal: "Patient Engagement Platform Expansion", stage: "Proposal", probability: 50, closeDate: "2024-12-15", daysToClose: 15 },
    { customer: "RetailGiant", deal: "Digital Commerce Platform", stage: "Proposal", probability: 65, closeDate: "2024-12-20", daysToClose: 20 }
  ],

  // Risk analysis (for "top risks" query)
  pipelineRisks: [
    {
      rank: 1,
      risk: "MegaLogistics Renewal At Risk",
      customer: "MegaLogistics",
      deal: "Platform Renewal 2025",
      value: 95000,
      severity: "Critical",
      description: "Leadership change has put $95K renewal at risk. New VP re-evaluating all vendors. Contract expires Jan 31.",
      mitigation: "Schedule urgent executive meeting, prepare value delivery report, consider retention discount"
    },
    {
      rank: 2,
      risk: "HealthCare Pro Budget Concerns",
      customer: "HealthCare Pro",
      deal: "Patient Engagement Platform Expansion",
      value: 125000,
      severity: "High",
      description: "CFO pushing back on budget due to cost-cutting. Champion (Dr. Foster) is strong but needs ammunition.",
      mitigation: "Prepare detailed ROI analysis, gather patient retention metrics from current deployment, offer phased implementation"
    },
    {
      rank: 3,
      risk: "TechSolutions Competitive Pressure",
      customer: "TechSolutions",
      deal: "Developer Platform Integration",
      value: 87500,
      severity: "Medium",
      description: "Active evaluation against two competitors. Price is main objection. Decision expected Dec 10.",
      mitigation: "Focus on TCO not price, demonstrate superior features, offer multi-year discount"
    }
  ]
};

export default opportunities;
