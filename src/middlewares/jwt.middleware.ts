import { NextFunction, Response } from "express";

import { DataStoredInToken, RequestWithUser } from "../dtos";
import { User } from "../entities";
import { NotFoundException, UnauthorizedException } from "../exceptions";
import { verifyToken } from "../helpers";
import { UserService } from "../services";

const userService = new UserService();

export const isAuthenticated = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string | undefined = req.headers["authorization"];

    if (!authHeader) {
      return next(new NotFoundException("The token has not been provided"));
    }

    const token: string = authHeader.split(" ")[1];

    const dataStoredInToken: DataStoredInToken = verifyToken(
      token,
      process.env.SECRET_KEY || "secret"
    );

    const userFound: User | null = await userService.getUserById(
      dataStoredInToken.id
    );

    if (!userFound) {
      return next(new UnauthorizedException("The token is invalid"));
    }

    req.user = userFound;

    next();
  } catch (error) {
    return next(new UnauthorizedException("The token is invalid"));
  }
};
