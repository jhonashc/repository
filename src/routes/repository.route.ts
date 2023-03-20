import { Router } from "express";

import { RepositoryController } from "../controllers";

const router = Router();

const repositoryController = new RepositoryController();

router.post("/", repositoryController.createRepository);
router.get("/", repositoryController.getRepositories);

export default router;
