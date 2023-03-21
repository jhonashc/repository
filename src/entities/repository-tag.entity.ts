import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Repository } from "./repository.entity";
import { Tag } from "./tag.entity";

@Entity("repository_tag")
export class RepositoryTag {
  @PrimaryColumn({
    name: "repository_id",
  })
  repositoryId: string;

  @PrimaryColumn({
    name: "tag_id",
  })
  tagId: string;

  @ManyToOne(() => Repository, (repository) => repository.tags, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "repository_id",
  })
  repository: Repository;

  @ManyToOne(() => Tag, (tag) => tag.repositories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "tag_id",
  })
  tag: Tag;

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
