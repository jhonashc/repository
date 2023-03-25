import { NextFunction, Request, Response } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";

import { BadRequestException } from "../exceptions";
import { ValidationType } from "../interfaces";

export const validateRequest = <T extends object>(
  classInstance: ClassConstructor<T>,
  validationType: ValidationType = ValidationType.BODY
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const convertedObject = plainToInstance(
        classInstance,
        req[validationType]
      );
      const errors = await validate(convertedObject);

      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => {
            const { constraints } = error;

            if (constraints) {
              if (Object.keys(constraints).length > 1) {
                return Object.values(constraints).join("|");
              }

              return Object.values(constraints);
            }
          })
          .join("|");

        throw new BadRequestException(message);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
