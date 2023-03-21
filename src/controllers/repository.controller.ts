import slugify from "slugify";
import { NextFunction, Request, Response } from "express";

import { CreateRepositoryDto, PaginationDto } from "../dtos";
import { Repository } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { RepositoryService } from "../services";

const repositoryService = new RepositoryService();

export class RepositoryController {
  async createRepository(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, slug, description, body, authorId, tagIds } =
        req.body as CreateRepositoryDto;

      const lowerCaseTitle = title.toLowerCase();

      const repositoryFound: Repository | null =
        await repositoryService.getRepositoryByTitle(lowerCaseTitle);

      if (repositoryFound) {
        throw new ConflictException(
          `The repository with title ${lowerCaseTitle} already exists`
        );
      }

      const createRepositoryDto: CreateRepositoryDto = {
        title: lowerCaseTitle,
        slug: slug ? slug : slugify(lowerCaseTitle),
        description,
        body,
        authorId,
        tagIds,
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
          tags: repository.tags?.map(({ tag }) => tag),
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

  async getRepositoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const repositoryFound: Repository | null =
        await repositoryService.getRepositoryById(id);

      if (!repositoryFound) {
        throw new NotFoundException(
          `The repository with id ${id} has not been found`
        );
      }

      const mappedRepository = {
        ...repositoryFound,
        tags: repositoryFound.tags?.map(({ tag }) => tag),
      };

      res.json({
        status: true,
        data: mappedRepository,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRepositoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const repositoryFound: Repository | null =
        await repositoryService.getRepositoryById(id);

      if (!repositoryFound) {
        throw new NotFoundException(
          `The repository with id ${id} has not been found`
        );
      }

      await repositoryService.deleteRepositoryById(id);

      res.json({
        status: true,
        data: repositoryFound,
      });
    } catch (error) {
      next(error);
    }
  }
}
