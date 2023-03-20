import { Request, Response } from "express";

import { CreateUserDto } from "../dtos";
import { User } from "../entities";
import { UserService } from "../services";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        avatarUrl,
        roles,
      } = req.body;

      const newUser: CreateUserDto = {
        firstName,
        lastName,
        username,
        email,
        password,
        avatarUrl,
        roles,
      };

      const userFound: User | null = await userService.getUserByEmail(email);

      if (userFound) {
        throw new Error("The user already exists");
      }

      const createdUser: User = await userService.createUser(newUser);

      res.json({
        status: true,
        data: createdUser,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error,
      });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users: User[] = await userService.getUsers();

      res.json({
        status: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error,
      });
    }
  }
}
