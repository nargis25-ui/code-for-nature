require("dotenv").config();

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Verify the Firebase ID token sent by the signed-in user.
async function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || "";
  const match = authorization.match(/^Bearer (.+)$/);

  if (!match) {
    return res.status(401).json({
      message: "Authentication required. Please sign in.",
    });
  }

  try {
    req.user = await admin.auth().verifyIdToken(match[1]);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}

app.get("/", (req, res) => {
  res.send("Green AI Backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy",
  });
});

// Retrieve only the signed-in user's usage records.
app.get("/api/usage", requireAuth, async (req, res) => {
  try {
    const snapshot = await db
      .collection("usageRecords")
      .where("userId", "==", req.user.uid)
      .get();

    const records = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

    res.status(200).json({ records });
  } catch (error) {
    console.error("Fetch usage error:", error);

    res.status(500).json({
      message: "Failed to fetch usage records",
    });
  }
});

// Save a usage record for the signed-in user.
app.post("/api/usage", requireAuth, async (req, res) => {
  const { electricity, water, ewaste, aiUsage } = req.body || {};
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
      userId: req.user.uid,
      electricity,
      water,
      ewaste,
      aiUsage,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("usageRecords").add(record);

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

// Vercel imports the app; local development starts the server.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Green AI Backend running at http://localhost:${PORT}`);
  });
}

module.exports = app;
