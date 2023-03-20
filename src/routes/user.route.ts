import { Router } from "express";

import { UserController } from "../controllers";

const router = Router();

const userController = new UserController();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);

export default router;
