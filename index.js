import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import Mainroute from "./routes/mainRoutes.js";

configDotenv(); // Load environment variables from .env file

const app = express();

// Middlewares
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Base route
app.get("/", (req, res) => {
  res.send("Car Rental API .... !");
});

// Main API routes
app.use("/v0/api", Mainroute);

// Start the server (for local development)
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running at port Number ${PORT}`);
  });