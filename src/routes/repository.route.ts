import { Router } from "express";

import { RepositoryController } from "../controllers";
import { isAuthenticated } from "../middlewares";
import {
  validateCreateRepository,
  validatePaginationQuery,
  validateUuidParam,
} from "../validators";

const router = Router();

const repositoryController = new RepositoryController();

router.post(
  "/",
  isAuthenticated,
  validateCreateRepository,
  repositoryController.createRepository
);

router.get("/", validatePaginationQuery, repositoryController.getRepositories);

router.get("/:id", validateUuidParam, repositoryController.getRepositoryById);

router.delete(
  "/:id",
  isAuthenticated,
  validateUuidParam,
  repositoryController.deleteRepositoryById
);

export default router;
