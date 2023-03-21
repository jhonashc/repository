import { check } from "express-validator";

import { ValidateRequest } from "../middlewares";

export const validateUuidParam = [
  check("id").isUUID().withMessage("the id must be an uuid"),
  ValidateRequest,
];

export const validatePaginationQuery = [
  check("limit").optional().isNumeric().withMessage("limit must be a number"),
  check("offset").optional().isNumeric().withMessage("offset must be a number"),
  ValidateRequest,
];
