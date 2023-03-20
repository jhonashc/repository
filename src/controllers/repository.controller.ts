import slugify from "slugify";
import { NextFunction, Request, Response } from "express";

import { CreateRepositoryDto, PaginationDto } from "../dtos";
import { Repository } from "../entities";
import { ConflictException } from "../exceptions";
import { RepositoryService } from "../services";

const repositoryService = new RepositoryService();

export class RepositoryController {
  async createRepository(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, slug, description, body, author, tags } =
        req.body as CreateRepositoryDto;

      const lowerCaseTitle = title.toLowerCase();

      const repositoryFound: Repository | null =
        await repositoryService.getRepositoryByTitle(lowerCaseTitle);

      if (repositoryFound) {
        throw new ConflictException("The repository already exists");
      }

      const createRepositoryDto: CreateRepositoryDto = {
        title: lowerCaseTitle,
        slug: slug ? slug : slugify(lowerCaseTitle),
        description,
        body,
        author,
        tags,
      };

      const createdRepository: Repository =
        await repositoryService.createRepository(createRepositoryDto);

      res.status(201).json({
        status: true,
        data: createdRepository,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRepositories(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = req.query as PaginationDto;

      const repositories: Repository[] =
        await repositoryService.getRepositories({
          limit,
          offset,
        });

      const mappedRepositories = repositories.map((repository) => {
        return {
          ...repository,
          tags: repository.tags.map(({ tag }) => tag),
        };
      });

      res.json({
        status: true,
        data: mappedRepositories,
      });
    } catch (error) {
      next(error);
    }
  }
}
