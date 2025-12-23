import type { Response } from "express";

export function success(res: Response, statusCode: number, data: object | string) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

export function failure(res: Response, statusCode: number, error: string) {
  return res.status(statusCode).json({
    success: false,
    error,
  });
}
