import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";
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

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsUUID("4", {
    each: true,
  })
  @IsArray()
  @IsOptional()
  tagIds?: string[];
}

export class UpdateRepositoryDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsUUID("4", {
    each: true,
  })
  @IsArray()
  @IsOptional()
  tagIds?: string[];
}
