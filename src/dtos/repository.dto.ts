export interface CreateRepositoryDto {
  title: string;
  slug?: string;
  description?: string;
  body: string;
  authorId: string;
  tagIds?: string[];
}

export interface UpdateRepositoryDto {}
