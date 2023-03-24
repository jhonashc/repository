import { Router } from "express";

import { UserController } from "../controllers";
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
  UuidParamDto,
} from "../dtos";
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
  hasPermission(["admin"]),
  validateRequest(CreateUserDto),
  userController.createUser
);

router.get(
  "/",
  validateRequest(UserQueryDto, ValidationType.QUERY),
  userController.getUsers
);

router.get("/:id", userController.getUserById);

router.patch(
  "/:id",
  isAuthenticated,
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  validateRequest(UpdateUserDto),
  userController.updateUserById
);

router.delete(
  "/:id",
  isAuthenticated,
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  userController.deleteUserById
);

export default router;
