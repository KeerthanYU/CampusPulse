import { getContext, setContext } from "./contextStore.js";

export function contextMiddleware(req, res, next) {
  const userId = req.user.id;
  req.context = getContext(userId);

  res.on("finish", () => {
    setContext(userId, req.context);
  });

  next();
}
