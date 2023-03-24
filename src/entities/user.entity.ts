import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Repository } from "./repository.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    name: "first_name",
  })
  firstName: string;

  @Column({
    type: "text",
    name: "last_name",
  })
  lastName: string;

  @Column({
    type: "text",
    unique: true,
  })
  username: string;

  @Column({
    type: "text",
    unique: true,
  })
  email: string;

  @Column({
    type: "text",
  })
  password: string;

  @Column({
    type: "text",
    name: "avatar_url",
    nullable: true,
  })
  avatarUrl?: string;

  @Column({
    type: "text",
    array: true,
    default: ["user"],
  })
  roles: string[];

  @OneToMany(() => Repository, (repository) => repository.author)
  repositories?: Repository[];

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
