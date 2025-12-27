import express from "express";
import { getGeminiResponse } from "../services/geminiService.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message, context } = req.body;

  const reply = await getGeminiResponse(`
You are CampusPulse AI assistant.
Context: ${context}
User: ${message}
`);

  res.json({ reply });
});

export default router;
