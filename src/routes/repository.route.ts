import { Router } from "express";

import { RepositoryController } from "../controllers";
import {
  CreateRepositoryDto,
  RepositoryQueryDto,
  UpdateRepositoryDto,
  UuidParamDto,
} from "../dtos";
import { ValidationType } from "../interfaces";
import { isAuthenticated, validateRequest } from "../middlewares";

const router = Router();

const repositoryController = new RepositoryController();

router.post(
  "/",
  isAuthenticated,
  validateRequest(CreateRepositoryDto),
  repositoryController.createRepository
);

router.get(
  "/",
  validateRequest(RepositoryQueryDto, ValidationType.QUERY),
  repositoryController.getRepositories
);

router.get(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  repositoryController.getRepositoryById
);

router.patch(
  "/:id",
  isAuthenticated,
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  validateRequest(UpdateRepositoryDto),
  repositoryController.updateRepositoryById
);

router.delete(
  "/:id",
  isAuthenticated,
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  repositoryController.deleteRepositoryById
);

export default router;
