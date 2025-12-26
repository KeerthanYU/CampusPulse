import express from "express";
import { askBot } from "../controllers/chatbotController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/ask", authMiddleware, askBot);

export default router;
