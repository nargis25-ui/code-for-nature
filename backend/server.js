const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Temporary in-memory storage
const usageRecords = [];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "EcoAI Sustainability Tracker API is running"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy"
  });
});

// Add usage record
app.post("/api/usage", (req, res) => {
  const { electricity, water, ewaste, aiUsage } = req.body;

  const values = { electricity, water, ewaste, aiUsage };

  for (const [key, value] of Object.entries(values)) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0
    ) {
      return res.status(400).json({
        error: `${key} must be a non-negative number`
      });
    }
  }

  const record = {
    id: usageRecords.length + 1,
    electricity,
    water,
    ewaste,
    aiUsage,
    createdAt: new Date().toISOString()
  };

  usageRecords.push(record);

  res.status(201).json({
    message: "Usage recorded successfully",
    record
  });
});

// Dashboard summary
app.get("/api/dashboard", (req, res) => {
  const totals = usageRecords.reduce(
    (sum, record) => ({
      electricity: sum.electricity + record.electricity,
      water: sum.water + record.water,
      ewaste: sum.ewaste + record.ewaste,
      aiUsage: sum.aiUsage + record.aiUsage
    }),
    { electricity: 0, water: 0, ewaste: 0, aiUsage: 0 }
  );

  res.json({
    recordsCount: usageRecords.length,
    units: {
      electricity: "kWh",
      water: "liters",
      ewaste: "kg",
      aiUsage: "prompts"
    },
    totals
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
