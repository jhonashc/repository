import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Repository } from "./repository.entity";
import { User } from "./user.entity";

@Entity("favorite_repository")
export class FavoriteRepository {
  @PrimaryColumn({
    name: "repository_id",
  })
  repositoryId: string;

  @PrimaryColumn({
    name: "user_id",
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.favorites, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @ManyToOne(() => Repository, (repository) => repository.favorites, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "repository_id",
  })
  repository: Repository;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
  })
  updatedAt: Date;
}
