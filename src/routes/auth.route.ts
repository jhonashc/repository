import { Router } from "express";

import { AuthController } from "../controllers";
import { validateLoginUser, validateRegisterUser } from "../validators";

const router = Router();

const authController = new AuthController();

router.post("/login", validateLoginUser, authController.login);

router.post("/register", validateRegisterUser, authController.register);

export default router;
