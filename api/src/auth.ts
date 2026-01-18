import { APIError, betterAuth, BetterAuthPlugin } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

import { createUserInfoAfterSignUp } from "./config/authPlugins";

const db = new PrismaClient();

const authConfig: ReturnType<typeof betterAuth> = betterAuth({
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

export default authConfig;
