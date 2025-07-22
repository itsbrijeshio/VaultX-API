import { Router } from "express";
import { SecretController } from "../controllers";
import { validateRequest } from "../middlewares";
import { updateSecretSchema } from "../validation/secret.schema";
import { querySchema } from "../validation/common.schema";
import { ExpressMiddleware } from "../types";

const secretController = new SecretController();
const isValidID = validateRequest.isValidId("secretId", "params", "Secret");

const router = Router();

router.get(
  "/",
  validateRequest(querySchema, "query"),
  secretController.handleGetSecretsByUser as ExpressMiddleware
);
router.get(
  "/:secretId",
  isValidID,
  secretController.handleGetSecret as ExpressMiddleware
);
router.put(
  "/:secretId",
  isValidID,
  validateRequest(updateSecretSchema),
  secretController.handleUpdateSecret as ExpressMiddleware
);
router.delete(
  "/:secretId",
  isValidID,
  secretController.handleDeleteSecret as ExpressMiddleware
);

export default router;
