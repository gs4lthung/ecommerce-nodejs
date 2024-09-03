import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
import mongooseConnection from "./databases/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";

checkOverload();
// Routes
import router from "./routers/index.js";
app.use("/", router);

// Error handler

export default app;
