import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { BadRequestException } from "../exceptions";

export const ValidateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map(({ msg }) => msg)
      .join(",");

    throw new BadRequestException(message);
  }

  next();
};
