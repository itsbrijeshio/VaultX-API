import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { ApiError } from "../utils";
import { Schema } from "zod";

type Source = "body" | "params" | "query";

const validateRequest =
  (schema: Schema, source: Source = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    const values = req[source];
    await schema.parseAsync(values);
    next();
  };

const isValidId =
  (prop = "id", source: Source = "params", name = "ID") =>
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req[source][prop];

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError({
        status: "failed",
        type: "Validation",
        code: 400,
        message: `${name} ID is invalid`,
      });
    }

    next();
    return id;
  };

validateRequest.isValidId = isValidId;

export default validateRequest;
