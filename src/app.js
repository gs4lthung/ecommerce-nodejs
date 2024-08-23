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
// Database
import mongooseConnection from "./databases/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";
checkOverload();
// Routes
app.get("/", (req, res, next) => {
  const strCompress = "Hello World";
  return res.status(200).json({
    message: "Welcome to the API",
    // metadata: strCompress.repeat(100000),
  });
});

// Error handler

export default app;
