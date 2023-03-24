import { DeleteResult, Like, Repository, UpdateResult } from "typeorm";

import { AppDataSource } from "../config";
import { CreateUserDto, UpdateUserDto, UserQueryDto } from "../dtos";
import { User } from "../entities";

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  getUsers(userQueryDto: UserQueryDto): Promise<User[]> {
    const { limit = 10, offset = 0 } = userQueryDto;

    return this.userRepository.find({
      take: limit,
      skip: offset,
    });
  }

  getUserByQuery(userQueryDto: UserQueryDto): Promise<User | null> {
    const { username, email } = userQueryDto;

    return this.userRepository.findOne({
      where: [
        { username: username?.toLowerCase() },
        { email: email?.toLowerCase() },
      ],
    });
  }

  getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  updateUserById(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  deleteUserById(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
