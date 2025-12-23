import type { Request, Response, NextFunction } from "express";

import authConfig from "../auth";
import { failure } from "../config/response";
import type { AuthSession } from "../types/auth";

export interface AuthRequest extends Request {
  authSession?: AuthSession;
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const session = await authConfig.api.getSession({ headers: req.headers });
    if (!session?.user || !session.session) {
      return failure(res, 401, "Unauthorized");
    }

    req.authSession = session;
    return next();
  } catch (err) {
    return failure(res, 500, `${err}`);
  }
}
