const express = require("express");
const router = express.Router();
const Anthropic = require("@anthropic-ai/sdk");
const Expense = require("../models/Expense");

const client = new Anthropic();

// Generate AI spending insights
router.get("/insights", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }).limit(50);

    if (expenses.length === 0) {
      return res.json({ insight: "No expenses logged yet. Start adding some to get AI insights!" });
    }

    const summary = expenses.map((e) => `${e.title} - ₹${e.amount} (${e.category}) on ${new Date(e.date).toDateString()}`).join("\n");

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Here are my recent expenses (total: ₹${total}):\n\n${summary}\n\nGive me 3 short, actionable personal finance insights based on these expenses. Be specific and practical. Use plain text, no markdown.`,
        },
      ],
    });

    res.json({ insight: message.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
