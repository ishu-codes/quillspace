import { APIError, betterAuth, BetterAuthPlugin } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

import { createUserInfoAfterSignUp } from "../config/authPlugins.js";

// Singleton pattern for Prisma Client (prevents connection issues)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

const db = new PrismaClient();
let authConfig: ReturnType<typeof betterAuth>;

try {
  authConfig = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:1337",
    trustedOrigins: ["http://localhost:5173"],
    secret: process.env.JWT_ACCESS_SECRET || "",

    database: prismaAdapter(db, {
      provider: "postgresql",
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },

    //   socialProviders: {
    //     google: {
    //       clientId: process.env.GITHUB_CLIENT_ID || "",
    //       clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    //       scopes: ["user:email"],
    //     },
    //   },
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
