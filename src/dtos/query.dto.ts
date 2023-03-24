import { Type } from "class-transformer";
import {
  IsOptional,
  IsPositive,
  Min,
  IsString,
  IsEmail,
} from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
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
  author?: string;
}

export class UserQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
