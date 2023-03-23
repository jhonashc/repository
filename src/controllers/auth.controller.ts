import { NextFunction, Request, Response } from "express";

import { LoginUserDto, RegisterUserDto } from "../dtos";
import { User } from "../entities";
import { ConflictException, UnauthorizedException } from "../exceptions";
import { comparePassword, encryptPassword, generateToken } from "../helpers";
import { Token } from "../interfaces";
import { UserService } from "../services";

const userService = new UserService();

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as LoginUserDto;

      const userFound: User | null = await userService.getUserByEmail(email);

      if (!userFound) {
        throw new UnauthorizedException("The email or password is incorrect");
      }

      const comparedPasswords: boolean = await comparePassword(
        password,
        userFound.password
      );

      if (!comparedPasswords) {
        throw new UnauthorizedException("The email or password is incorrect");
      }

      const token: Token = generateToken(userFound);

      res.status(200).json({
        status: true,
        ...token,
      });
    } catch (error) {
      next(error);
    }
  }

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

      const tokenData: Token = generateToken(createdUser);

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
