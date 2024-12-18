import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import userRoute from "./routes/carRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import cardRoutes from "./routes/cardRoutes.js ";
import driverRoutes from "./routes/driverRoutes.js"
import fuelingRoutes from "./routes/fuelingRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import schedule from 'node-schedule';
import {sendPreDueDateReminder ,sendDueDateAlert } from "./Controller/notificationController.js";

configDotenv(); // Load environment variables from .env file

const app = express();

// Middlewares
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Base route
app.get("/", (req, res) => {
  res.send("Car Rental API .... !");
});

app.use("/user",userRoute)
app.use("/cars",carRoutes);
app.use("/bookings",bookingRoutes);
app.use("/cards",cardRoutes);
app.use("/drivers",driverRoutes);
app.use("/fuelings",fuelingRoutes);
app.use("/maintenances",maintenanceRoutes);
app.use("/notifications",notificationRoutes)
schedule.scheduleJob('0 8 * * *', async () => {
  try {
    await sendPreDueDateReminder();
  } catch (error) {
    console.error('Error sending pre-due date reminders:', error);
  }
});

// Schedule due date alerts to run every day at 8 AM
schedule.scheduleJob('0 8 * * *', async () => {
  try {
    await sendDueDateAlert();
  } catch (error) {
    console.error('Error sending due date alerts:', error);
  }
});
app.listen(process.env.PORT,()=>{
  console.log("server is running")
})
