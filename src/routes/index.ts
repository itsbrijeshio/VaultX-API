import { Router } from "express";
import authRouter from "./auth";
import vaultRouter from "./vault";
import secretRouter from "./secret";
import { authGuard } from "../middlewares";

const router = Router();

router.use("/auth", authRouter);
router.use("/vaults", authGuard, vaultRouter);
router.use("/secrets", authGuard, secretRouter);

export default router;
