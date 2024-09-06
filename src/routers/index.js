import express from "express";
const router = express.Router();
import { apiKey, permission } from "../auth/checkAuth.js";

router.get("", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the API",
  });
});

// check apiKey
router.use(apiKey);
// check permission
router.use(permission("0000"));

import accessRouter from "./access/index.js";
router.use("/v1/api", accessRouter);

export default router;
