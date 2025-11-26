import express from "express";
import { toNodeHandler } from "better-auth/node";
import authConfig from "./auth";
import requireAuth from "./middlewares/auth";
import cors from "cors";

import feedRouter from "./feed";
import draftsRouter from "./drafts";
import listsRouter from "./lists";
import postsRouter from "./posts";
import libraryRouter from "./library";

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

// Middlewares
// app.use(requireAuth);
app.all("/api/auth/*splat", toNodeHandler(authConfig));

// Routes
app.get("/", (_, res) => {
	res.send("Hello World!");
});
app.use("/api/feed", feedRouter);
app.use("/api/drafts", draftsRouter);
app.use("/api/lists", listsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/library", libraryRouter);

export default app;
