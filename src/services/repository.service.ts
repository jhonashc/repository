import {
  DeleteResult,
  Equal,
  FindOptionsWhere,
  Repository,
  Like,
  In,
  Not,
} from "typeorm";

import { AppDataSource } from "../config";
import {
  CreateRepositoryDto,
  RepositoryQueryDto,
  UpdateRepositoryDto,
} from "../dtos";
import { Repository as RepositoryEntity, RepositoryTag } from "../entities";
import { NotFoundException } from "../exceptions";

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
    const { authorId, tagIds, ...repositoryDetails } = createRepositoryDto;

    const newRepository: RepositoryEntity = this.repository.create({
      ...repositoryDetails,
      author: {
        id: authorId,
      },
      tags: tagIds?.map((tagId) =>
        this.repositoryTag.create({
          tag: {
            id: tagId,
          },
        })
      ),
    });

    return this.repository.save(newRepository);
  }

  getRepositories(
    repositoryQueryDto: RepositoryQueryDto
  ): Promise<RepositoryEntity[]> {
    const {
      author,
      tag,
      title,
      status,
      limit = 10,
      offset = 0,
    } = repositoryQueryDto;

    const findOptionsWhere: FindOptionsWhere<RepositoryEntity> = {};

    if (author) {
      findOptionsWhere.author = {
        username: Like(author.toLowerCase()),
      };
    }

    if (tag) {
      findOptionsWhere.tags = {
        repository: {
          tags: {
            tag: {
              name: Like(`%${tag.toLowerCase()}%`),
            },
          },
        },
      };
    }

    if (title) {
      findOptionsWhere.title = Like(`%${title.toLowerCase()}%`);
    }

    if (status) {
      findOptionsWhere.status = status;
    }

    return this.repository.find({
      where: findOptionsWhere,
      relations: {
        tags: {
          tag: true,
        },
      },
      order: {
        createdAt: "DESC",
      },
      take: limit,
      skip: offset,
    });
  }

  getRepositoryByTitle(title: string): Promise<RepositoryEntity | null> {
    return this.repository.findOne({
      where: {
        title: Equal(title),
      },
    });
  }

  getRepositoryById(id: string): Promise<RepositoryEntity | null> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        tags: {
          tag: true,
        },
      },
    });
  }

  async updateRepositoryById(
    id: string,
    updateRepositoryDto: UpdateRepositoryDto
  ): Promise<RepositoryEntity | undefined> {
    const { tagIds, ...repositoryDetails } = updateRepositoryDto;

    const repositoryFound: RepositoryEntity | undefined =
      await this.repository.preload({
        id,
        ...repositoryDetails,
      });

    if (!repositoryFound) {
      throw new NotFoundException(
        `The repository with id ${id} has not been found`
      );
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(RepositoryTag, {
        repository: {
          id: repositoryFound.id,
        },
      });

      repositoryFound.tags = tagIds?.map((tagId) =>
        this.repositoryTag.create({
          tag: {
            id: tagId,
          },
        })
      );

      await queryRunner.manager.save(repositoryFound);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return repositoryFound;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  deleteRepositoryById(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
