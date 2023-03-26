import { Type } from "class-transformer";
import {
  IsOptional,
  IsPositive,
  Min,
  IsString,
  IsEmail,
  IsEnum,
  Max,
} from "class-validator";

import { RepositoryStatus } from "../entities";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(20)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}

export class RepositoryQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsEnum(RepositoryStatus)
  status?: RepositoryStatus;
}

export class UserQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
