import zod from "zod";

const label = zod
  .string({
    error: "Label is required.",
  })
  .min(3, { message: "Label must be at least 3 characters" })
  .max(50, { message: "Label must be at most 50 characters" });

const description = zod
  .string({
    error: "Description is required.",
  })
  .min(3, { message: "Description must be at least 3 characters" })
  .max(50, { message: "Description must be at most 100 characters" });

export const createVaultSchema = zod
  .object({
    label,
    description: description.optional(),
  })
  .strict();

export const updateVaultSchema = zod
  .object({
    label: label.optional(),
    description: description.optional(),
  })
  .strict();
