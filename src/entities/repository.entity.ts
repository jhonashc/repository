import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { FavoriteRepository } from "./favorite-repository.entity";
import { RepositoryTag } from "./repository-tag.entity";
import { User } from "./user.entity";

export enum RepositoryStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

@Entity("repository")
export class Repository {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    unique: true,
  })
  title: string;

  @Column({
    type: "text",
    unique: true,
  })
  slug: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description?: string;

  @Column({
    type: "text",
  })
  body: string;

  @ManyToOne(() => User, (user) => user.repositories, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author: User;

  @OneToMany(() => RepositoryTag, (repositoryTag) => repositoryTag.repository, {
    cascade: true,
  })
  tags?: RepositoryTag[];

  @OneToMany(
    () => FavoriteRepository,
    (favoriteRepository) => favoriteRepository.repository,
    {
      cascade: true,
    }
  )
  favorites?: FavoriteRepository[];

  @Column({
    type: "enum",
    enum: RepositoryStatus,
    default: RepositoryStatus.PENDING,
  })
  status: RepositoryStatus;

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
