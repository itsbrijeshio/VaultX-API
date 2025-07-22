import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { ApiError, logger } from "../utils";
import { env } from "../config";

const formatZodError = (zodError: ZodError) => {
  return zodError.issues?.reduce<Record<string, any>>(
    (acc: Record<string, any>, issue: any) => {
      const path = issue.path.join(".");
      acc[path] = issue.message;
      return acc;
    },
    {}
  );
};

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({
      success: false,
      status: err.status,
      type: err.type,
      code: err.code,
      message: err.message,
      details: err?.details,
    });
  } else if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      status: "failed",
      type: "Validation",
      code: 400,
      message: "Input validation failed. Please check your input.",
      details: formatZodError(err),
    });
  } else if (
    err instanceof JsonWebTokenError ||
    err instanceof TokenExpiredError ||
    err instanceof NotBeforeError
  ) {
    return res.status(409).json({
      success: false,
      status: "failed",
      type: "Unauthorized",
      code: 401,
      message: err.message,
    });
  }

  // log error
  logger.error(`${err?.toString} - ${req.path} - ${req.method} - ${req.ip}`);

  return res.status(500).json({
    success: false,
    status: "error",
    type: "InternalServerError",
    code: 500,
    message: "Something went wrong",
    details: env.NODE_ENV === "development" ? err : null,
  });
};

export default errorHandler;
