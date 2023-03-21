import { Router } from "express";

import { RepositoryController } from "../controllers";
import {
  validateCreateRepository,
  validatePaginationQuery,
  validateUuidParam,
} from "../validators";

const router = Router();

const repositoryController = new RepositoryController();

router.post(
  "/",
  validateCreateRepository,
  repositoryController.createRepository
);

router.get("/", validatePaginationQuery, repositoryController.getRepositories);

router.get("/:id", validateUuidParam, repositoryController.getRepositoryById);

router.delete(
  "/:id",
  validateUuidParam,
  repositoryController.deleteRepositoryById
);

export default router;
