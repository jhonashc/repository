import { Router } from "express";

import { UserController } from "../controllers";
import { CreateUserDto, PaginationDto, UpdateUserDto } from "../dtos";
import { ValidationType } from "../interfaces";
import {
  isAuthenticated,
  hasPermission,
  validateRequest,
} from "../middlewares";

const router = Router();

const userController = new UserController();

router.post(
  "/",
  isAuthenticated,
  validateRequest(CreateUserDto),
  hasPermission(["admin", "moderator"]),
  userController.createUser
);

router.get(
  "/",
  validateRequest(PaginationDto, ValidationType.QUERY),
  userController.getUsers
);

router.get("/:id", userController.getUserById);

router.patch(
  "/:id",
  isAuthenticated,
  validateRequest(UpdateUserDto),
  userController.updateUserById
);

router.delete("/:id", isAuthenticated, userController.deleteUserById);

export default router;
