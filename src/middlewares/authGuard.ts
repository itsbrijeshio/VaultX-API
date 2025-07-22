import jwt from "jsonwebtoken";
import { ApiError } from "../utils";
import { env } from "../config";
import { NextFunction, Response } from "express";

const authGuard: any = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers?.["x-access-token"]?.toString();
  const accessToken = req.cookies?.["access_token"] || token;

  if (!accessToken) {
    throw new ApiError({
      type: "Unauthorized",
      code: 401,
      message: "You are not logged in.",
    });
  }

  const decoded: any = jwt.verify(accessToken, env.JWT_SECRET);
  req.auth = { _id: decoded._id };

  if (!req.auth?._id) {
    throw new ApiError({
      type: "Unauthorized",
      code: 401,
      message: "Your session has expired. Please log in again.",
    });
  }
  next();
};

export default authGuard;
