import { Router } from "express";
import { VaultController, SecretController } from "../controllers";
import { validateRequest } from "../middlewares";
import {
  createVaultSchema,
  updateVaultSchema,
} from "../validation/vault.schema";
import { createSecretSchema } from "../validation/secret.schema";
import { querySchema } from "../validation/common.schema";
import { ExpressMiddleware } from "../types";

const vaultController = new VaultController();
const secretController = new SecretController();
const isValidID = validateRequest.isValidId("vaultId", "params", "Vault");

const router = Router();

router.post(
  "/",
  validateRequest(createVaultSchema),
  vaultController.handleCreateVault as ExpressMiddleware
);
router.get(
  "/",
  validateRequest(querySchema, "params"),
  vaultController.handleGetVaults as ExpressMiddleware
);
router.post(
  "/:vaultId/secrets",
  isValidID,
  validateRequest(createSecretSchema),
  secretController.handleCreateSecret as ExpressMiddleware
);
router.get(
  "/:vaultId/secrets",
  isValidID,
  validateRequest(querySchema, "params"),
  secretController.handleGetSecretsByVault as ExpressMiddleware
);
router.get(
  "/:vaultId",
  isValidID,
  vaultController.handleGetVault as ExpressMiddleware
);
router.put(
  "/:vaultId",
  isValidID,
  validateRequest(updateVaultSchema),
  vaultController.handleUpdateVault as ExpressMiddleware
);
router.delete(
  "/:vaultId",
  isValidID,
  vaultController.handleDeleteVault as ExpressMiddleware
);

export default router;
