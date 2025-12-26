import * as chatbotService from "../services/chatbotService.js";

export const askBot = async (req, res, next) => {
  try {
    const response = await chatbotService.processQuery(req.body.question);
    res.json({ success: true, answer: response });
  } catch (err) {
    next(err);
  }
};
