import { check } from "express-validator";

import { ValidateRequest } from "../middlewares";

export const validateUuidParam = [
  check("id").isUUID().withMessage("the id must be an uuid"),
  ValidateRequest,
];
