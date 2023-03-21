import { check } from "express-validator";

import { ValidateRequest } from "../middlewares";

export const validateCreateRepository = [
  check("title").not().isEmpty().withMessage("title cannot be empty"),
  check("body").not().isEmpty().withMessage("body cannot be empty"),
  check("authorId")
    .not()
    .isEmpty()
    .withMessage("body cannot be empty")
    .isUUID()
    .withMessage("the authorId must be a uuid"),
  check("tagIds").optional().isArray().withMessage("tagIds must be an array"),
  check("tagIds.*").isUUID().withMessage("tagIds must be an array of uuid"),
  ValidateRequest,
];
