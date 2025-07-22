import zod from "zod";

const q = zod
  .string({
    error: "Query is required.",
  })
  .min(1, { message: "Query must be at least 1 characters" })
  .max(50, { message: "Query must be at most 50 characters" });

const page = zod
  .number({
    error: "Page is required.",
  })
  .min(1, { message: "Page must be at least 1" })
  .default(1);

const limit = zod
  .number({
    error: "Limit is required.",
  })
  .min(1, { message: "Limit must be at least 1" })
  .max(50, { message: "Limit must be at most 50" })
  .default(20);

export const querySchema = zod.object({
  q: q.optional(),
  page,
  limit,
});
