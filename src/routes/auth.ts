import { Router } from "express";
import { AuthController } from "../controllers";
import { authGuard, validateRequest } from "../middlewares";
import { registerSchema, loginSchema } from "../validation/user.schema";
import { ExpressMiddleware } from "../types";

const authController = new AuthController();

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.handleRegister
);
router.post("/login", validateRequest(loginSchema), authController.handleLogin);
router.get("/logout", authGuard, authController.handleLogout);
router.get("/me", authGuard, authController.handleGetMe as ExpressMiddleware);

export default router;
