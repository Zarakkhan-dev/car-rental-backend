import express from "express";
import db from "./Config/db.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import Mainroute from "./routes/mainRoutes.js";

configDotenv(); // Load environment variables from .env file

const app = express();

// Function to start the server and connect to the database
async function startServer() {
  try {
    const result = await db.raw(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log("Database connected successfully...");
    console.log("Tables in the database:", result.rows);
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if database connection fails
  }
}

startServer();

// Middlewares
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use("/v0/api", Mainroute);

// Base route
app.get("/", (req, res) => {
  res.send("Car Rental API .... !");
});

// Catch-all route for undefined GET requests
app.get("*", (req, res) => {
  res.send("Route not defined!");
});

// Universal 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

// Universal error handler for server errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status,
    message: err.message,
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at port Number ${PORT}`);
});
