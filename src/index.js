import dotenv from "dotenv";
import express from "express";
import { testConnection } from "./config/db.js";
import { initDB } from "./config/initDB.js";
import schoolRoutes from "./routes/schoolRoutes.js";

dotenv.config();


//Middleware 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "School Management API is running",
    version: "1.0.0",
    endpoints: {
      addSchool: "POST /addSchool",
      listSchools: "GET /listSchools?latitude=<lat>&longitude=<lon>",
    },
  });
});

//Routes
app.use("/", schoolRoutes);

//404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

//Start server
async function start() {
  await testConnection();
  await initDB();

  app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  });
}

start();