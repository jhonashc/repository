import { RepositoryTag, User } from "../entities";

export interface CreateRepositoryDto {
  title: string;
  slug?: string;
  description?: string;
  body: string;
  author: User;
  tags?: RepositoryTag[];
}

export interface UpdateRepositoryDto {}
