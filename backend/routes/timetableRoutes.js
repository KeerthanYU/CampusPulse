import express from "express";
import { getTodayTimetable } from "../controllers/timetableController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/today", authMiddleware, getTodayTimetable);

export default router;
