import { DeepPartial, Equal, In, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateRepositoryDto, PaginationDto } from "../dtos";
import {
  Repository as RepositoryEntity,
  RepositoryStatus,
  RepositoryTag,
} from "../entities";

export class RepositoryService {
  private readonly repository: Repository<RepositoryEntity>;
  private readonly repositoryTag: Repository<RepositoryTag>;

  constructor() {
    this.repository = AppDataSource.getRepository(RepositoryEntity);
    this.repositoryTag = AppDataSource.getRepository(RepositoryTag);
  }

  async createRepository(
    createRepositoryDto: CreateRepositoryDto
  ): Promise<RepositoryEntity> {
    const { authorId, tagIds = [], ...repositoryDetails } = createRepositoryDto;
    const tags: DeepPartial<RepositoryTag[]> = tagIds.map((tagId) => ({
      tag: {
        id: tagId,
      },
    }));

    const createdRepository: RepositoryEntity = this.repository.create({
      author: {
        id: authorId,
      },
      ...repositoryDetails,
    });
    await this.repository.save(createdRepository);

    const createdRepositoryTags: RepositoryTag[] =
      this.repositoryTag.create(tags);

    createdRepositoryTags.forEach((rt) => (rt.repository = createdRepository));

    await this.repositoryTag.save(createdRepositoryTags);

    return createdRepository;
  }

  getRepositories(paginationDto: PaginationDto): Promise<RepositoryEntity[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.repository.find({
      where: {
        status: In([
          RepositoryStatus.PENDING,
          RepositoryStatus.REJECTED,
          RepositoryStatus.ACCEPTED,
        ]),
      },
      relations: {
        tags: {
          tag: true,
        },
      },
      take: limit,
      skip: offset,
    });
  }

  getRepositoryByTitle(title: string): Promise<RepositoryEntity | null> {
    return this.repository.findOne({
      where: {
        title: Equal(title),
        status: In([
          RepositoryStatus.PENDING,
          RepositoryStatus.REJECTED,
          RepositoryStatus.ACCEPTED,
        ]),
      },
    });
  }
}
