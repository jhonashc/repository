import { Router } from "express";

import { RepositoryController } from "../controllers";
import { validateCreateRepository } from "../validators";

const router = Router();

const repositoryController = new RepositoryController();

router.post(
  "/",
  validateCreateRepository,
  repositoryController.createRepository
);

router.get("/", repositoryController.getRepositories);

export default router;
