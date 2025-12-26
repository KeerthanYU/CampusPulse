import express from "express";
import { handleChat } from "./aiController.js";
import { moderationMiddleware } from "./moderation/moderationMiddleware.js";
import { contextMiddleware } from "./contextManagement/contextMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/chat",
  protect,
  moderationMiddleware,
  contextMiddleware,
  handleChat
);

export default router;
