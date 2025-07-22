import zod from "zod";

const name = zod
  .string({
    error: "Name is required.",
  })
  .min(3, { message: "Name must be at least 3 characters" })
  .max(30, { message: "Name must be at most 30 characters" });

const email = zod
  .string({
    error: "Email is required.",
  })
  .email({ message: "Please enter a valid email address" });

const password = zod
  .string({
    error: "Password is required.",
  })
  .min(6, { message: "Password must be at least 6 characters" })
  .max(30, { message: "Password must be at most 30 characters" });

export const registerSchema = zod
  .object({
    name,
    email,
    password,
  })
  .strict();

export const loginSchema = zod
  .object({
    email,
    password,
  })
  .strict();