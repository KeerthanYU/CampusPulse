import { detectIntent } from "./intentDetection/intentClassifier.js";
import { generateResponse } from "./responseGeneration/responseController.js";

export async function handleChat(req, res) {
  const { message } = req.body;
  const user = req.user;

  const intent = detectIntent(message);
  const reply = await generateResponse(intent, message, user);

  res.json({
    intent,
    reply
  });
}
