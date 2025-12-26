import { isContentSafe } from "./moderationService.js";

export function moderationMiddleware(req, res, next) {
  const { message } = req.body;

  if (!isContentSafe(message)) {
    return res.status(400).json({
      error: "Message violates content policy"
    });
  }

  next();
}
