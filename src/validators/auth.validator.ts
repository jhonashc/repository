import { check } from "express-validator";

import { ValidateRequest } from "../middlewares";

export const validateLoginUser = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("invalid email"),
  check("password").not().isEmpty().withMessage("password cannot be empty"),
  ValidateRequest,
];

export const validateRegisterUser = [
  check("firstName").not().isEmpty().withMessage("firstName cannot be empty"),
  check("lastName").not().isEmpty().withMessage("lastName cannot be empty"),
  check("username").not().isEmpty().withMessage("username cannot be empty"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("invalid email"),
  check("password").not().isEmpty().withMessage("password cannot be empty"),
  ValidateRequest,
];
