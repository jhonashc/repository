import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsArray,
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
