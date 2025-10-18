import express from "express";
import { toNodeHandler } from "better-auth/node";
import authConfig from "./auth";
import requireAuth from "./middlewares/auth";

import feedRouter from "./feed";

const app = express();

// Middlewares
// app.use(requireAuth);
app.all("/api/auth/*splat", toNodeHandler(authConfig));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/feed", requireAuth, feedRouter);

export default app;
