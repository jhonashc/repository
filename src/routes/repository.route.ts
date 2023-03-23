import { Router } from "express";

import { RepositoryController } from "../controllers";
import { CreateRepositoryDto } from "../dtos";
import { isAuthenticated, validateRequest } from "../middlewares";

const router = Router();

const repositoryController = new RepositoryController();

router.post(
  "/",
  isAuthenticated,
  validateRequest(CreateRepositoryDto),
  repositoryController.createRepository
);

router.get("/", repositoryController.getRepositories);

router.get("/:id", repositoryController.getRepositoryById);

router.delete(
  "/:id",
  isAuthenticated,
  repositoryController.deleteRepositoryById
);

export default router;
