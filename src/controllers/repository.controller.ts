import slugify from "slugify";
import { NextFunction, Request, Response } from "express";

import { CreateRepositoryDto, PaginationDto } from "../dtos";
import { Repository, Tag, User } from "../entities";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions";
import { RequestWithUser } from "../interfaces";
import { RepositoryService, TagService, UserService } from "../services";

const repositoryService = new RepositoryService();
const tagService = new TagService();
const userService = new UserService();

export class RepositoryController {
  async createRepository(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        slug,
        description,
        body,
        authorId,
        tagIds = [],
      } = req.body as CreateRepositoryDto;

      const lowerCaseTitle = title.toLowerCase();

      const repositoryFound: Repository | null =
        await repositoryService.getRepositoryByTitle(lowerCaseTitle);

      if (repositoryFound) {
        throw new ConflictException(
          `The repository with title ${lowerCaseTitle} already exists`
        );
      }

      const userFound: User | null = await userService.getUserById(authorId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${authorId} has not been found`
        );
      }

      const validTags: Tag[] = await tagService.checkIfTagsExist(tagIds);

      if (validTags.length !== tagIds.length) {
        throw new NotFoundException(`The id of some tag is invalid`);
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

  async deleteRepositoryById(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const repositoryFound: Repository | null =
        await repositoryService.getRepositoryById(id);

      if (!repositoryFound) {
        throw new NotFoundException(
          `The repository with id ${id} has not been found`
        );
      }

      const authenticatedUser: User = req.user!;
      const repositoryAuthor: User = repositoryFound.author;

      const isTheSameCreator: boolean =
        authenticatedUser.id === repositoryAuthor.id;

      if (!isTheSameCreator) {
        throw new UnauthorizedException(
          `The repository with the title ${id} can only be deleted by the creator`
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
