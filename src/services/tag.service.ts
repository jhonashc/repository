import { In, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { Tag } from "../entities";

export class TagService {
  private readonly tagRepository: Repository<Tag>;

  constructor() {
    this.tagRepository = AppDataSource.getRepository(Tag);
  }

  checkIfTagsExist(tagIds: string[]) {
    return this.tagRepository.find({
      where: {
        id: In(tagIds),
      },
    });
  }
}
