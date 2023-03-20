import { Request, Response } from "express";

import { CreateUserDto, PaginationDto, UpdateUserDto } from "../dtos";
import { User } from "../entities";
import { encryptPassword } from "../helpers";
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
      } = req.body as CreateUserDto;

      const userFound: User | null = await userService.getUserByEmail(email);

      if (userFound) {
        return res.status(409).json({
          status: false,
          message: "The user already exists",
        });
      }

      const createUserDto: CreateUserDto = {
        firstName,
        lastName,
        username,
        email,
        password: await encryptPassword(password),
        avatarUrl,
        roles,
      };

      const createdUser: User = await userService.createUser(createUserDto);

      res.status(201).json({
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
      const { limit, offset } = req.query as PaginationDto;

      const users: User[] = await userService.getUsers({ limit, offset });

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

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userFound: User | null = await userService.getUserById(id);

      if (!userFound) {
        return res.status(404).json({
          status: false,
          message: "The user has not been found",
        });
      }

      res.json({
        status: true,
        data: userFound,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error,
      });
    }
  }

  async updateUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        avatarUrl,
        roles,
      } = req.body as UpdateUserDto;

      const userFound: User | null = await userService.getUserById(id);

      if (!userFound) {
        return res.status(404).json({
          status: false,
          message: "The user has not been found",
        });
      }

      const updateUserDto: UpdateUserDto = {
        firstName,
        lastName,
        username,
        email,
        password: password && (await encryptPassword(password)),
        avatarUrl,
        roles,
      };

      await userService.updateUserById(id, updateUserDto);

      const updatedUser: User | null = await userService.getUserById(id);

      res.json({
        status: true,
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        status: false,
        message: error,
      });
    }
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userFound: User | null = await userService.getUserById(id);

      if (!userFound) {
        return res.status(404).json({
          status: false,
          message: "The user has not been found",
        });
      }

      await userService.deleteUserById(id);

      const deletedUser: User = {
        ...userFound,
        status: false,
      };

      res.json({
        status: true,
        data: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error,
      });
    }
  }
}
