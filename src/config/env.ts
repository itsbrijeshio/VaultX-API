import { config } from "dotenv";

config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env"
      : process.env.NODE_ENV === "test"
      ? ".env.test"
      : ".env.dev",
  quiet: true,
});

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET as string,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
};

export default env;
