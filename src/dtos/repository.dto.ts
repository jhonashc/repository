import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";

import { RepositoryTag, User } from "../entities";

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  @Type(() => User)
  author: User;

  @IsArray()
  @IsOptional()
  @Type(() => RepositoryTag)
  tags?: RepositoryTag[];
}

export class UpdateRepositoryDto {}
