# Mock CRM API Server

A mock CRM API designed specifically for chatbot integration. Provides rich, realistic data that enables natural conversational queries about customers, deals, pipeline, and sales activities.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:3001`

## Sample Data

The API includes realistic mock data:

| Entity | Count | Examples |
|--------|-------|----------|
| Customers | 8 | RetailGiant, HealthCare Pro, Acme Corp, TechSolutions, Global Media |
| Deals | 5 active | Total pipeline: ~$487.5K, Avg deal: ~$97.5K |
| Contacts | 12 | Decision makers, champions, influencers |
| Activities | 12 | Meetings, calls, demos, emails |
| Tasks | 10 | Follow-ups, preparations, urgent items |

## Chatbot Query Examples

The API is optimized to answer these types of questions:

### Pipeline & Deals
- **"What's our current deal pipeline status?"** → `GET /api/pipeline`
- **"Summarize our top customers by deal value"** → `GET /api/customers/top`
- **"Which deals are closest to closing?"** → `GET /api/deals/closing-soon`
- **"What's our average deal size this quarter?"** → `GET /api/metrics/deal-size`

### Specific Deal Queries
- **"Tell me more about the HealthCare Pro deal"** → `GET /api/deals/healthcare-pro`
- **"How should I approach the TechSolutions negotiation?"** → `GET /api/deals/techsolutions/negotiation`

### Metrics & Analysis
- **"What's the reason for the conversion rate decline?"** → `GET /api/metrics/conversion`
- **"What are the top 3 risks in our current pipeline?"** → `GET /api/pipeline/risks`
- **"Which customer is most at risk?"** → `GET /api/customers/at-risk`

### Tasks & Priorities
- **"Which customer should I focus on first today?"** → `GET /api/tasks/priorities`
- **"What customer follow-ups do I have this week?"** → `GET /api/tasks/this-week`
- **"Generate an activity summary for today"** → `GET /api/activities/summary`

## API Endpoints

### Chatbot-Optimized Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/pipeline` | Current deal pipeline status with totals and breakdown |
| `GET /api/customers/top` | Top customers ranked by deal value |
| `GET /api/deals/closing-soon` | Deals ordered by close probability and date |
| `GET /api/metrics/conversion` | Conversion rate analysis with recommendations |
| `GET /api/pipeline/risks` | Top 3 pipeline risks with mitigation strategies |
| `GET /api/tasks/priorities` | Today's prioritized task list with reasoning |
| `GET /api/tasks/this-week` | This week's customer follow-ups |
| `GET /api/activities/summary` | Activity summary and engagement metrics |
| `GET /api/metrics/deal-size` | Average deal size calculation |
| `GET /api/customers/at-risk` | At-risk customers and deals |
| `GET /api/deals/:customerName` | Detailed deal info (e.g., `/api/deals/healthcare-pro`) |
| `GET /api/deals/:customerName/negotiation` | Negotiation strategy and advice |

### Standard CRUD Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/customers` | List all customers |
| `GET /api/customers/:id` | Get customer with related data |
| `GET /api/contacts` | List contacts |
| `GET /api/opportunities` | List opportunities |
| `GET /api/activities` | List activities |
| `GET /api/tasks` | List tasks |
| `GET /api/notes` | List strategic notes |
| `GET /api/products` | List products |
| `GET /api/users` | List sales team |
| `GET /api/stats` | Statistics overview |
| `GET /api/search?q=` | Search across entities |

## Example Responses

### Pipeline Status
```json
{
  "summary": {
    "totalDeals": 5,
    "totalValue": 487500,
    "averageDealSize": 97500,
    "weightedPipeline": 300000
  },
  "deals": [
    { "rank": 1, "customer": "RetailGiant", "value": 150000, "stage": "Proposal" },
    { "rank": 2, "customer": "HealthCare Pro", "value": 125000, "stage": "Proposal" },
    ...
  ]
}
```

### Conversion Rate
```json
{
  "currentRate": 28,
  "previousRate": 33,
  "change": -5,
  "trend": "declining",
  "factors": [
    "Increased competition in mid-market segment",
    "Longer decision cycles due to economic uncertainty"
  ],
  "recommendations": [
    "Improve early-stage qualification",
    "Develop competitive battle cards"
  ]
}
```

### Today's Priorities
```json
{
  "todaysPriorities": [
    {
      "rank": 1,
      "customer": "MegaLogistics",
      "task": "Retention meeting - AT RISK",
      "reason": "$95K renewal at risk, competitors approaching new VP"
    },
    {
      "rank": 2,
      "customer": "TechSolutions", 
      "task": "Pricing follow-up",
      "reason": "In negotiation, decision expected Dec 10"
    }
  ]
}
```

## Data Scenarios

The mock data includes specific scenarios for realistic chatbot interactions:

1. **RetailGiant** - Largest deal ($150K), strong champion, technical concerns to address
2. **HealthCare Pro** - High value deal ($125K) with budget objections from CFO
3. **Acme Corp** - Recently closed ($75K), expansion potential
4. **TechSolutions** - In negotiation ($87.5K), price-sensitive, competitive evaluation
5. **Global Media** - Early stage ($50K), need access to decision maker
6. **MegaLogistics** - AT RISK renewal ($95K), lost champion, urgent attention needed

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3001 | Server port |

## License

MIT
