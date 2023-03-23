import { Router } from "express";

import { UserController } from "../controllers";
import { isAuthenticated, hasPermission } from "../middlewares";
import {
  validateCreateUser,
  validatePaginationQuery,
  validateUpdateUser,
  validateUuidParam,
} from "../validators";

const router = Router();

const userController = new UserController();

router.post(
  "/",
  isAuthenticated,
  hasPermission(["admin"]),
  validateCreateUser,
  userController.createUser
);

router.get("/", validatePaginationQuery, userController.getUsers);

router.get("/:id", validateUuidParam, userController.getUserById);

router.patch(
  "/:id",
  isAuthenticated,
  validateUuidParam,
  validateUpdateUser,
  userController.updateUserById
);

router.delete(
  "/:id",
  isAuthenticated,
  validateUuidParam,
  userController.deleteUserById
);

export default router;
