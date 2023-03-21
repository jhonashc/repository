import { Router } from "express";

import { UserController } from "../controllers";
import { validateCreateUser } from "../validators";

const router = Router();

const userController = new UserController();

router.post("/", validateCreateUser, userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export default router;
