import { NextFunction, Response } from "express";

import { RequestWithUser } from "../dtos";
import { User } from "../entities";
import { BadRequestException, ForbiddenException } from "../exceptions";

export const hasPermission = (validRoles: string[] = []) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userFound: User | undefined = req.user;

      if (!validRoles || validRoles.length === 0) {
        return next();
      }

      if (!userFound) {
        throw new BadRequestException("The user has not been found");
      }

      for (const role of userFound.roles) {
        if (validRoles.includes(role)) {
          return next();
        }
      }

      throw new ForbiddenException(
        `The user ${userFound.username} need a valid role [${validRoles}].`
      );
    } catch (error) {
      next(error);
    }
  };
};
