import zod from "zod";

const label = zod
  .string({
    error: "Label is required.",
  })
  .min(3, { message: "Label must be at least 3 characters" })
  .max(100, { message: "Label must be at most 100 characters" });

const key = zod
  .string({
    error: "Key is required.",
  })
  .min(3, { message: "Key must be at least 3 characters" })
  .max(100, { message: "Key must be at most 100 characters" });

const value = zod
  .string({
    error: "Value is required.",
  })
  .min(3, { message: "Value must be at least 3 characters" })
  .max(100, { message: "Value must be at most 100 characters" });

const token = zod
  .string({
    error: "Token is required.",
  })
  .refine(
    (value) => {
      return ["TOKEN", "PASSWORD", "API-KEY", "OTHER"].includes(value);
    },
    {
      message: "TOKEN must be TOKEN, PASSWORD, API-KEY, OTHER",
    }
  );

export const createSecretSchema = zod
  .object({
    label,
    key,
    value,
    token: token.optional(),
  })
  .strict();

export const updateSecretSchema = zod
  .object({
    label: label.optional(),
    key: key.optional(),
    value: value.optional(),
    token: token.optional(),
  })
  .strict();
