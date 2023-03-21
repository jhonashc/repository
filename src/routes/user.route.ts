import { Router } from "express";

import { UserController } from "../controllers";
import {
  validateCreateUser,
  validateUpdateUser,
  validateUuidParam,
} from "../validators";

const router = Router();

const userController = new UserController();

router.post("/", validateCreateUser, userController.createUser);

router.get("/", userController.getUsers);

router.get("/:id", validateUuidParam, userController.getUserById);

router.patch(
  "/:id",
  validateUuidParam,
  validateUpdateUser,
  userController.updateUserById
);

router.delete("/:id", validateUuidParam, userController.deleteUserById);

export default router;
