import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import grievanceRoutes from "./routes/grievanceRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/grievances", grievanceRoutes);
app.use("/api/chat", chatbotRoutes);

app.use(errorHandler);

export default app;
