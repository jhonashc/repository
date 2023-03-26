import { NextFunction, Request, Response } from "express";

import { CreateUserDto, UpdateUserDto, UserQueryDto } from "../dtos";
import { User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { encryptPassword } from "../helpers";
import { UserService } from "../services";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
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

      const lowerCaseUsername = username.toLowerCase();
      const lowerCaseEmail = email.toLowerCase();

      const userFound: User | null = await userService.getUserByQuery({
        username: lowerCaseUsername,
        email: lowerCaseEmail,
      });

      if (userFound) {
        throw new ConflictException(`The user already exists`);
      }

      const createUserDto: CreateUserDto = {
        firstName,
        lastName,
        username: lowerCaseUsername,
        email: lowerCaseEmail,
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
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, favorites, limit, offset } =
        req.query as UserQueryDto;

      const users: User[] = await userService.getUsers({
        username,
        email,
        favorites,
        limit,
        offset,
      });

      const mappedUsers = users.map((user) => {
        return {
          ...user,
          favorites: user.favorites?.map(
            ({ repository }) => repository
          ),
        };
      });

      res.json({
        status: true,
        data: mappedUsers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userFound: User | null = await userService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${id} has not been found`
        );
      }

      res.json({
        status: true,
        data: userFound,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
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

      const lowerCaseEmail = email?.toLowerCase();

      const userFound: User | null = await userService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${id} has not been found`
        );
      }

      const updateUserDto: UpdateUserDto = {
        firstName,
        lastName,
        username: username?.toLowerCase(),
        email: lowerCaseEmail,
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
      next(error);
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userFound: User | null = await userService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${id} has not been found`
        );
      }

      await userService.deleteUserById(id);

      res.json({
        status: true,
        data: userFound,
      });
    } catch (error) {
      next(error);
    }
  }
}
