import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateFavoriteRepositoryDto {
  @IsUUID()
  @IsNotEmpty()
  repositoryId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

export class DeleteFavoriteRepositoryDto {
  @IsUUID()
  @IsNotEmpty()
  repositoryId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
