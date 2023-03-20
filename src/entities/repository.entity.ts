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

import { User } from "./user.entity";
import { RepositoryTag } from "./repository-tag.entity";

export enum RepositoryStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  DELETED = "deleted",
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
  description: string;

  @Column({
    type: "text",
  })
  body: string;

  @ManyToOne(() => User, (user) => user.repositories, {
    eager: true,
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author: User;

  @OneToMany(() => RepositoryTag, (repositoryTag) => repositoryTag.repository)
  tags: RepositoryTag[];

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
