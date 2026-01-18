import type { Request, Response, NextFunction } from "express";

import authConfig from "../auth/index.js";
import { failure } from "../config/response";
import type { AuthSession } from "../types/auth";

export interface AuthRequest extends Request {
  authSession?: AuthSession;
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        headers.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v));
      }
    }

    const session = await authConfig.api.getSession({ headers });
    if (!session?.user || !session.session) {
      return failure(res, 401, "Unauthorized");
    }

    req.authSession = session;
    return next();
  } catch (err) {
    return failure(res, 500, `${err}`);
  }
}
