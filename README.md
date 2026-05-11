# 💰 AI Finance Tracker

A full-stack personal expense tracker with **AI-powered spending insights** using the Claude API.

## Features

- ✅ Add, view, and delete expenses with categories
- 📊 Doughnut chart showing spending by category
- 🤖 AI insights — click a button and Claude analyzes your spending patterns
- 🗃️ MongoDB for persistent data storage
- 🌐 Clean vanilla JS frontend (no frameworks)

## Tech Stack

| Layer     | Tech              |
|-----------|-------------------|
| Backend   | Node.js + Express |
| Database  | MongoDB + Mongoose|
| AI        | Anthropic Claude  |
| Frontend  | HTML + CSS + Vanilla JS |
| Charts    | Chart.js          |

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-finance-tracker.git
cd ai-finance-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `MONGODB_URI` — your MongoDB connection string
- `ANTHROPIC_API_KEY` — get one at [console.anthropic.com](https://console.anthropic.com)

### 4. Run the app

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## API Endpoints

| Method | Route                  | Description              |
|--------|------------------------|--------------------------|
| GET    | /api/expenses          | Get all expenses         |
| POST   | /api/expenses          | Add a new expense        |
| DELETE | /api/expenses/:id      | Delete an expense        |
| GET    | /api/expenses/summary  | Category totals          |
| GET    | /api/ai/insights       | Get AI spending insights |

## Screenshots

> Add a screenshot of the UI here after running the app.

## License

MIT
