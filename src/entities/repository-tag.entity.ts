import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Repository } from "./repository.entity";
import { Tag } from "./tag.entity";

@Entity("repository_tag")
export class RepositoryTag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Repository, (repository) => repository.repositoryTags, {
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "repository_id",
  })
  repository: Repository;

  @ManyToOne(() => Tag, (tag) => tag.repositoryTags, {
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "tag_id",
  })
  tag: Tag;

  @Column({
    type: "boolean",
    default: true,
  })
  status: boolean;

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
