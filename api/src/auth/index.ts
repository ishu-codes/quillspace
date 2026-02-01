import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import dotenv from "dotenv";
dotenv.config();

import { createUserInfoAfterSignUp } from "../config/authPlugins.js";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

const isProd = process.env.NODE_ENV == "production";

if (!isProd) {
  globalForPrisma.prisma = prisma;
}

const db = new PrismaClient();
let authConfig: ReturnType<typeof betterAuth>;

try {
  const betterAuthUrl = (process.env.BETTER_AUTH_URL || "http://localhost:1337").replace(/\/$/, "");
  authConfig = betterAuth({
    baseURL: betterAuthUrl + "/api/auth",
    trustedOrigins: (process.env.TRUSTED_ORIGINS || "http://localhost:5173").split(",").map((origin) => origin.trim()),
    secret: process.env.BETTER_AUTH_SECRET || "",

    database: prismaAdapter(db, {
      provider: "postgresql",
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },

    session: {
      name: "session-token",
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // Update every day
      cookieAttributes: {
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        httpOnly: true,
        path: "/",
        domain: "quillspace-omega.vercel.app",
      },
      cookieCache: {
        enabled: true,
        maxAge: 10 * 60, // Cache duration in seconds (5 minutes)
      },
    },
    advanced: {
      cookies: {
        session_token: {
          name: "session-token",
          attributes: {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
          },
        },
      },
      defaultCookieAttributes: {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
      },
    },

    plugins: [
      createUserInfoAfterSignUp(),
      // username(),
      // anonymous({
      // 	generateName: async () => generateDemoName()
      // })
    ],
  });
} catch (err) {
  console.error("Better Auth initialization error:", err);
  throw err;
}

export default authConfig;
