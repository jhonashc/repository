import { Repository, UpdateResult } from "typeorm";

import { AppDataSource } from "../config";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { User } from "../entities";

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        status: true,
      },
    });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  updateUserById(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  deleteUserById(id: string): Promise<UpdateResult> {
    return this.userRepository.update(id, {
      status: false,
    });
  }
}
