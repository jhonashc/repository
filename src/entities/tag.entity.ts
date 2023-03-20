import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from "typeorm";

import { RepositoryTag } from "./repository-tag.entity";

@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    unique: true,
  })
  name: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    type: "boolean",
    default: true,
  })
  status: boolean;

  @OneToMany(() => RepositoryTag, (repositoryTag) => repositoryTag.tag)
  repositories: RepositoryTag[];

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
