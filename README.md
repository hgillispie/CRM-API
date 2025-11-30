# Mock CRM API Server

A comprehensive mock CRM API server providing rich data for chatbot integration. This API simulates a full-featured Customer Relationship Management system with customers, contacts, opportunities, activities, and more.

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or run in development mode with auto-reload
npm run dev
```

The server runs on `http://localhost:3001` by default.

## API Overview

| Endpoint | Description |
|----------|-------------|
| `/api/customers` | Customer/Account management |
| `/api/contacts` | Contact management |
| `/api/opportunities` | Sales opportunities & pipeline |
| `/api/activities` | Activity/interaction history |
| `/api/products` | Product catalog |
| `/api/users` | Sales team & user management |
| `/api/tasks` | Task management |
| `/api/notes` | Account notes & intelligence |
| `/api/search` | Global & semantic search |
| `/api/stats` | Statistics & analytics |

## Data Model

### Customers (15 accounts)
Rich customer data including:
- Company information (name, industry, sector, type)
- Financial data (annual revenue, lifetime value, credit limit)
- Health metrics (health score, risk level)
- Relationship data (account owner, contract renewal date)
- Tags and categorization

### Contacts (25 contacts)
Contact details including:
- Personal information (name, title, department)
- Communication preferences
- Decision-making authority (decision maker, influencer flags)
- Relationship notes

### Opportunities (21 deals)
Sales pipeline data including:
- Deal information (name, amount, stage, probability)
- Timeline (close date, created date)
- Forecast category (Commit, Best Case, Pipeline)
- Products included
- Competitor information

### Activities (25 interactions)
Activity history including:
- Type (meeting, call, email, demo)
- Outcome tracking
- Attendees and notes
- Next steps

### Products (20 products)
Product catalog including:
- Categories and pricing
- Features and target markets
- Dependencies and requirements

### Users (11 team members)
Sales team data including:
- Role and territory
- Quota and attainment
- Performance metrics

### Tasks (20 tasks)
Task management including:
- Priority and status
- Due dates and assignments
- Related entities

### Notes (12 notes)
Strategic notes including:
- Account intelligence
- Relationship notes
- Deal strategies

## API Endpoints

### Customers

```
GET /api/customers
GET /api/customers/:id
GET /api/customers/:id/contacts
GET /api/customers/:id/opportunities
GET /api/customers/:id/activities
GET /api/customers/:id/notes
GET /api/customers/:id/tasks
GET /api/customers/:id/summary
```

**Query Parameters:**
- `industry` - Filter by industry
- `status` - Filter by status (Active, At Risk, Inactive)
- `type` - Filter by type (Enterprise, Mid-Market, Small Business)
- `owner` - Filter by account owner
- `minRevenue`, `maxRevenue` - Revenue range filter
- `riskLevel` - Filter by risk level (Low, Medium, High)
- `minHealthScore`, `maxHealthScore` - Health score filter
- `tags` - Filter by tags (comma-separated)
- `sort`, `order` - Sorting
- `limit`, `offset` - Pagination

### Contacts

```
GET /api/contacts
GET /api/contacts/:id
GET /api/contacts/role/decision-makers
GET /api/contacts/by-customer/:customerId
```

**Query Parameters:**
- `customerId` - Filter by customer
- `decisionMaker` - Filter decision makers (true/false)
- `influencer` - Filter influencers (true/false)
- `department` - Filter by department
- `title` - Filter by title

### Opportunities

```
GET /api/opportunities
GET /api/opportunities/:id
GET /api/opportunities/pipeline
GET /api/opportunities/forecast
GET /api/opportunities/by-owner/:owner
GET /api/opportunities/closing/soon
```

**Query Parameters:**
- `stage` - Filter by stage (Discovery, Qualification, Proposal, Negotiation, Closed Won, Closed Lost, Stalled)
- `owner` - Filter by owner
- `customerId` - Filter by customer
- `minAmount`, `maxAmount` - Amount range
- `forecastCategory` - Filter by forecast (Commit, Best Case, Pipeline)
- `type` - Filter by type (New Business, Expansion, Renewal, Upsell, Cross-sell)
- `closeAfter`, `closeBefore` - Close date range
- `minProbability` - Minimum probability

### Activities

```
GET /api/activities
GET /api/activities/:id
GET /api/activities/recent
GET /api/activities/summary
```

**Query Parameters:**
- `type` - Filter by type (meeting, call, email, demo)
- `customerId` - Filter by customer
- `contactId` - Filter by contact
- `opportunityId` - Filter by opportunity
- `outcome` - Filter by outcome (Positive, Neutral, Negative, Action Required)
- `owner` - Filter by owner
- `startDate`, `endDate` - Date range

### Products

```
GET /api/products
GET /api/products/:id
GET /api/products/catalog
```

**Query Parameters:**
- `category` - Filter by category
- `type` - Filter by type (License, Add-on, Service)
- `targetMarket` - Filter by target market
- `minPrice`, `maxPrice` - Price range

### Users

```
GET /api/users
GET /api/users/:id
GET /api/users/:id/performance
GET /api/users/sales-team
```

**Query Parameters:**
- `role` - Filter by role
- `department` - Filter by department
- `region` - Filter by region

### Tasks

```
GET /api/tasks
GET /api/tasks/:id
GET /api/tasks/due-soon
GET /api/tasks/overdue
GET /api/tasks/by-assignee/:assigneeId
```

**Query Parameters:**
- `status` - Filter by status (Pending, In Progress, Completed)
- `priority` - Filter by priority (High, Medium, Low)
- `assignee` - Filter by assignee ID
- `customerId` - Filter by customer
- `type` - Filter by type
- `dueBefore`, `dueAfter` - Due date range

### Notes

```
GET /api/notes
GET /api/notes/:id
GET /api/notes/pinned
```

**Query Parameters:**
- `customerId` - Filter by customer
- `opportunityId` - Filter by opportunity
- `contactId` - Filter by contact
- `author` - Filter by author
- `pinned` - Filter pinned notes (true)
- `tags` - Filter by tags (comma-separated)

### Search

```
GET /api/search?q=query           # Global search
GET /api/search/customers?q=query  # Customer search
GET /api/search/contacts?q=query   # Contact search
GET /api/search/opportunities?q=query # Opportunity search
GET /api/search/semantic?q=query   # Semantic search for chatbot queries
```

The semantic search endpoint understands natural language queries like:
- "at risk customers"
- "largest opportunities"
- "opportunities closing soon"
- "decision makers"
- "upcoming renewals"
- "sales forecast"
- "recent activities"
- "overdue tasks"

### Statistics

```
GET /api/stats/overview     # CRM overview statistics
GET /api/stats/pipeline     # Pipeline statistics by stage/owner
GET /api/stats/performance  # Team performance metrics
GET /api/stats/renewals     # Upcoming renewal analysis
GET /api/stats/industry     # Statistics by industry
GET /api/stats/health       # Customer health overview
```

## Example Requests

### Get all enterprise customers
```bash
curl "http://localhost:3001/api/customers?type=Enterprise"
```

### Get opportunities closing in next 30 days
```bash
curl "http://localhost:3001/api/opportunities/closing/soon?days=30"
```

### Search for customers in healthcare
```bash
curl "http://localhost:3001/api/search/customers?q=healthcare"
```

### Get pipeline summary
```bash
curl "http://localhost:3001/api/opportunities/pipeline"
```

### Get customer summary with all related data
```bash
curl "http://localhost:3001/api/customers/cust_001/summary"
```

### Semantic search for chatbot
```bash
curl "http://localhost:3001/api/search/semantic?q=at%20risk%20customers"
curl "http://localhost:3001/api/search/semantic?q=largest%20opportunities"
curl "http://localhost:3001/api/search/semantic?q=upcoming%20renewals"
```

## Response Format

All list endpoints return paginated responses:

```json
{
  "data": [...],
  "total": 15,
  "limit": 10,
  "offset": 0,
  "hasMore": true
}
```

Many endpoints include enriched data with related entity names and summary statistics.

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `PORT` | 3001 | Server port |

## Use with Chatbot

This API is designed to be used with a chatbot that can query CRM data. The `/api/search/semantic` endpoint provides intent detection and returns relevant data based on natural language queries.

Example chatbot queries the API can handle:
- "Show me all at-risk customers"
- "What are our largest open opportunities?"
- "Which deals are closing this month?"
- "Who are the decision makers at Apex Manufacturing?"
- "What's our current sales forecast?"
- "Show me recent customer activities"
- "What tasks are overdue?"

## License

MIT
