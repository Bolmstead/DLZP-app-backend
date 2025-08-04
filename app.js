const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");
require("dotenv").config();

const app = express();
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Secure on backend
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (optional, for frontend integration)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.post("/api/chat", async (req, res) => {
  console.log("Received chat request:", req.body);

  // Validate request body
  if (!req.body || !Array.isArray(req.body)) {
    return res
      .status(400)
      .json({ error: "Invalid request: messages array is required" });
  }

  // Check if API key is configured
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY not configured");
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      messages: req.body,
      max_tokens: 500,
    });
    console.log("Received response from Claude:", response);
    res.json(response);
  } catch (error) {
    console.error("Error in /api/chat endpoint:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      headers: error.headers,
    });
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "DLZP Backend is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
