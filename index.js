import express from "express"
import db from "./Config/db.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import Mainroute from "./routes/mainRoutes.js";
configDotenv();
const app = express();

async function startServer() {
	try {
		const result = await db.raw(
			"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
		);
		console.log("Database connected successfully...");
		console.log("Tables in the database:", result.rows);

	} catch (err) {
		console.error("Error connecting to the database:", err);
		process.exit(1); 
	}
}

startServer();

//middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/v0/api",Mainroute)


app.get("/",(req,res)=>{
    res.send("Car Rental API .... !")
})

app.get("*",()=>{
    res.send("")
})

// Universal 404 handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Cannot find ${req.originalUrl} on this server!`,
    });
  });
  
  // Universal error handler
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
  
    res.status(statusCode).json({
      status,
      message: err.message,
    });
  });
const PORT = process.env.PORT || 3001
app.listen(PORT , ()=>{
    console.log(`Server is running at port Number ${PORT}`)
})