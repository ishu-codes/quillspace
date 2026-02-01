import express from "express";
import type { Request, Response, NextFunction } from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

import authConfig from "./auth/index.js";
import { failure, success } from "./config/response.js";
// import { requireAuth } from "./middlewares/auth";

import bookmarksRouter from "./routes/bookmarks/index.js";
import feedRouter from "./routes/feed/index.js";
import draftsRouter from "./routes/drafts/index.js";
import listsRouter from "./routes/lists/index.js";
import postsRouter from "./routes/posts/index.js";
import libraryRouter from "./routes/library/index.js";
import usersRouter from "./routes/users/index.js";
// import uploadRouter from "./routes/upload/index.js";

const app = express();

// CORS setup
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : undefined;
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!corsOrigins || !origin || corsOrigins.includes(origin)) {
        // allow all origins if not specified
        // allow requests like direct browser visits (no Origin header)
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
// app.use(cors());

app.use(express.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return failure(res, 500, `Internal Server Error: ${err}`);
});

// Middlewares
// app.use(requireAuth);
app.all("/api/auth/*splat", toNodeHandler(authConfig));

// Routes
app.get("/", (_, res) => {
  return success(res, 200, "Hello World!");
});
app.use("/api/bookmarks", bookmarksRouter);
app.use("/api/feed", feedRouter);
app.use("/api/drafts", draftsRouter);
app.use("/api/lists", listsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/library", libraryRouter);
app.use("/api/users", usersRouter);
// app.use("/api/upload", uploadRouter);

export default app;
