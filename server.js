const express = require("express");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Routes
app.use("/auth", authRoutes);

// Protected route
app.get("/perf/v1/campaign", authMiddleware, async (req, res) => {
  try {
    const response = await fetch(
      "http://ec2-13-234-117-185.ap-south-1.compute.amazonaws.com/perf/v1/campaign?isOptimize=1",
      {
        headers: {
          token: req.token,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
