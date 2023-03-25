import { BaseError } from "./base.exception";

export class BadRequestException extends BaseError {
  statusCode = 400;
  message: string;

  constructor(message: string = "Bad Request") {
    super(message);
    this.message = message;
    this.name = "BadRequestException";
  }
}
