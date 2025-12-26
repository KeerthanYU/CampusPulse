import express from "express";
import { submitGrievance } from "../controllers/grievanceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, submitGrievance);

export default router;
