import { Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";

const oneDay = 1000 * 60 * 60 * 24;

const signCookie = (res: Response, secret: string, options?: any): string => {
  const token = jwt.sign({ _id: secret }, env.JWT_SECRET, {
    expiresIn: parseInt(env.JWT_EXPIRES_IN) * oneDay || oneDay * 7,
  });

  const cookieOptions = {
    expires: new Date(Date.now() + oneDay * 7),
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    ...options,
  };

  res.cookie("access_token", token, cookieOptions);
  return token;
};

export default signCookie;
