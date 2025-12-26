import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";

connectDB();

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CampusPulse backend running on port ${PORT}`);
});

