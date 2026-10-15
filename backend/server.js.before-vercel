
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Green AI Backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy",
  });
});

// GET: Retrieve usage records from Firestore
app.get("/api/usage", async (req, res) => {
  try {
    const snapshot = await db
      .collection("usageRecords")
      .orderBy("createdAt", "desc")
      .get();

    const records = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ records });
  } catch (error) {
    console.error("Fetch usage error:", error);

    res.status(500).json({
      message: "Failed to fetch usage records",
    });
  }
});

// POST: Save usage records to Firestore
app.post("/api/usage", async (req, res) => {
  const { electricity, water, ewaste, aiUsage } = req.body;

  const values = { electricity, water, ewaste, aiUsage };

  for (const [key, value] of Object.entries(values)) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0
    ) {
      return res.status(400).json({
        error: `${key} must be a non-negative number`,
      });
    }
  }

  try {
    const record = {
      electricity,
      water,
      ewaste,
      aiUsage,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db
      .collection("usageRecords")
      .add(record);

    res.status(201).json({
      message: "Usage saved to Firestore successfully",
      id: docRef.id,
      record,
    });
  } catch (error) {
    console.error("Firestore save error:", error);

    res.status(500).json({
      error: "Could not save usage data",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Green AI Backend running at http://localhost:${PORT}`);
});
