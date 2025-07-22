import { NextFunction, Request, Response } from "express";

// =============== Error Status ================
export type ErrorStatus = "failed" | "warning" | "info" | "error";

// ================ Error Type ================
export type ErrorType =
  | "BadRequest"
  | "Validation"
  | "Unauthorized"
  | "NotFound"
  | "Conflict"
  | "Forbidden"
  | "InternalServerError"
  | "Unknown";

// ================ Error Code ================
export type ErrorCode = 400 | 401 | 403 | 404 | 409 | 500 | 501 | 503;

// ================ Error Options ================
export interface ErrorOptions {
  success?: boolean;
  status?: ErrorStatus;
  type: ErrorType;
  code: ErrorCode;
  message: string;
  details?: any;
}

// ================ Auth Request ================
export interface AuthRequest
  extends Request<any, any, any, any, Record<string, any>> {
  auth: {
    _id: string;
    role?: string;
  };
  temp?: any;
}

// =============== Express Middleware ================
export type ExpressMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => any;

// ============== Input Types ================

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type VaultProps = {
  label: string;
  description?: string;
  user: string;
};

export type QueryProps = {
  q?: string;
  search?: string;
  page: number;
  limit: number;
};

export type SecretProps = {
  label: string;
  key: string;
  value: string;
  type: string;
  vault: string;
  user: string;
};

// =============== Output Types ================
export type UserRes = {
  _id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type VaultRes = {
  _id: string;
  label: string;
  description?: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SecretRes = {
  _id: string;
  label: string;
  key: string;
  value: string;
  type: string;
  vault: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
};