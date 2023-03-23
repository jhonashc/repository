import { Router } from "express";

import { AuthController } from "../controllers";
import { LoginUserDto, RegisterUserDto } from "../dtos";
import { validateRequest } from "../middlewares";

const router = Router();

const authController = new AuthController();

router.post("/login", validateRequest(LoginUserDto), authController.login);

router.post(
  "/register",
  validateRequest(RegisterUserDto),
  authController.register
);

export default router;
