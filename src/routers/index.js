import express from "express";

const router = express.Router();
router.get("", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to the API",
  });
});
import accessRouter from "./access/index.js";
router.use("/v1/api", accessRouter);
export default router;
