import { Repository } from "typeorm";

import { AppDataSource } from "../config";
import { User } from "../entities";
import { CreateUserDto } from "../dtos/user.dto";

export class UserService {
  private userRepository: Repository<User>;

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
}
