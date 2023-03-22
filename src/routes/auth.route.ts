import { Router } from "express";

import { AuthController } from "../controllers";

const router = Router();

const authController = new AuthController();

router.post("/register", authController.register);

export default router;
