import { NextFunction, Request, Response } from "express";

import { LoginUserDto, RegisterUserDto, TokenData } from "../dtos";
import { User } from "../entities";
import { ConflictException } from "../exceptions";
import { encryptPassword, generateToken } from "../helpers";
import { UserService } from "../services";

const userService = new UserService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, username, email, password, avatarUrl } =
        req.body as RegisterUserDto;

      const lowerCaseEmail = email.toLowerCase();

      const userFound: User | null = await userService.getUserByEmail(
        lowerCaseEmail
      );

      if (userFound) {
        throw new ConflictException(
          `The user with email ${email} already exists`
        );
      }

      const signUpUserDto: RegisterUserDto = {
        firstName,
        lastName,
        username: username.toLowerCase(),
        email: lowerCaseEmail,
        password: await encryptPassword(password),
        avatarUrl,
      };

      const createdUser: User = await userService.createUser(signUpUserDto);

      const tokenData: TokenData = generateToken(createdUser);

      res.status(201).json({
        status: true,
        ...tokenData,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}
