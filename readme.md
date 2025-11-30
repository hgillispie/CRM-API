# Mock CRM API Server

A mock CRM API designed specifically for chatbot integration. Provides rich, realistic data that enables natural conversational queries about customers, deals, pipeline, and sales activities.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:3001`

**Production Deployment:** `https://crm-api-production.up.railway.app/api`

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

The API is optimized to answer these types of questions. You can either:

1. **Use the Chat Proxy Endpoint** (`POST /api/chat/messages`) - Send natural language questions and get AI-powered responses with full CRM context
2. **Use Direct Endpoints** - Query specific endpoints for structured data

### Using the Chat Proxy (Recommended)

With the chat proxy endpoint, you can ask natural questions and get intelligent responses:

- **"What are our top 3 customers by deal value?"** → Returns AI-generated summary with specific customer names and values
- **"Which deals are closing soon?"** → Returns formatted list of deals with close dates and probabilities
- **"What's our current pipeline status?"** → Returns comprehensive pipeline analysis
- **"Who are our key contacts at HealthCare Pro?"** → Returns contact information for that customer
- **"What tasks do I have this week?"** → Returns prioritized task list with context

### Using Direct Endpoints

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

### Chat Proxy Endpoint (Claude API Integration)

| Endpoint | Description |
|----------|-------------|
| `POST /api/chat/messages` | Proxy endpoint for Claude API calls with automatic CRM context enrichment |

**Full Documentation Below ⬇️**

**`POST /api/chat/messages`** - Proxy endpoint for Claude API calls with CRM context

This endpoint acts as a secure proxy between your frontend and the Anthropic Claude API, automatically enriching requests with CRM data context to enable intelligent, data-aware responses.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What are our top 3 customers by deal value?"
    }
  ],
  "system": "You are a helpful CRM assistant.",  // Optional
  "max_tokens": 1024  // Optional, defaults to 1024
}
```

**Response (Success):**
```json
{
  "success": true,
  "content": "Based on the CRM data, your top 3 customers by deal value are:\n1. RetailGiant - $150,000 (Proposal stage)\n2. HealthCare Pro - $125,000 (Proposal stage)\n3. TechSolutions - $100,000 (Negotiation stage)...",
  "usage": {
    "input_tokens": 1234,
    "output_tokens": 456
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid request: messages array is required"
}
```

**Features:**
- ✅ Automatically fetches CRM data from all relevant endpoints
- ✅ Builds comprehensive system prompt with CRM context
- ✅ Calls Anthropic Claude API (model: `claude-3-5-haiku-20241022`)
- ✅ Handles CORS for frontend integration
- ✅ Server-side API key management (secure)
- ✅ Returns formatted responses with token usage

**CRM Data Included in System Prompt:**
The endpoint automatically fetches and includes the following CRM data in the system prompt sent to Claude:

1. **Customers List** - Top 10 customers with name, industry, status, and health score
2. **Top Customers by Deal Value** - Top 5 customers ranked by deal value with stage
3. **Deals Closing Soon** - Top 5 deals with customer, value, close date, and probability
4. **Contacts** - Top 10 contacts with name, title, and customer
5. **Open Tasks** - Up to 10 open tasks with priority, due date, and customer
6. **Pipeline Summary** - Total deals, total value, average deal size, weighted pipeline
7. **Pipeline by Stage** - Breakdown of deals by stage with counts and values

The data is formatted as structured text sections that Claude can reference when answering questions. The system prompt instructs Claude to use this CRM data to provide accurate, helpful responses.

**Example System Prompt Structure:**
```
You are a helpful CRM assistant that helps users understand their customer data, deals, pipeline, and tasks.

You have access to the following CRM data:

CUSTOMERS (8 total):
- RetailGiant (Retail, Status: Active, Health Score: 85)
- HealthCare Pro (Healthcare, Status: Active, Health Score: 90)
...

TOP CUSTOMERS BY DEAL VALUE:
1. RetailGiant - $150,000 (Proposal)
2. HealthCare Pro - $125,000 (Proposal)
...

DEALS CLOSING SOON:
- RetailGiant - $150,000 (Close Date: 2024-12-15, Probability: 75%)
...

[Additional sections for contacts, tasks, pipeline...]

Use this CRM data to provide accurate, helpful responses. When users ask about customers, deals, tasks, or pipeline status, reference the specific data above.
```

This allows Claude to answer questions like:
- "Show me our top 3 customers"
- "Which deals are closing soon?"
- "What's our pipeline status?"
- "Who are our key contacts?"
- "What tasks do I have this week?"

**Environment Variables:**
- `ANTHROPIC_API_KEY` (required) - Your Anthropic API key for Claude API calls

**CORS Configuration:**
The endpoint is configured to allow requests from all origins (`Access-Control-Allow-Origin: *`) to work around CORS restrictions. This can be restricted to specific domains if needed.

**Example Usage:**
```javascript
const response = await fetch('https://crm-api-production.up.railway.app/api/chat/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'What are our top customers?' }
    ],
    max_tokens: 1024
  })
});

const data = await response.json();
console.log(data.content); // Claude's response with CRM context
```

**Error Handling:**
The endpoint returns appropriate HTTP status codes:
- `400` - Invalid request (missing messages, invalid format)
- `500` - Server error (missing API key, Anthropic API error, internal errors)

All errors include a `success: false` flag and an `error` message describing the issue.

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
| `ANTHROPIC_API_KEY` | (required) | Anthropic API key for Claude API calls via `/api/chat/messages` |

**Note:** The `ANTHROPIC_API_KEY` must be set as an environment variable in your deployment (e.g., Railway, Heroku, etc.) for the chat proxy endpoint to work.

## License

MIT
