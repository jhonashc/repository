import { BaseError } from "./base.exception";

export class ForbiddenException extends BaseError {
  statusCode = 403;
  message: string;

  constructor(message: string = "Forbidden") {
    super(message);
    this.message = message;
    this.name = "ForbiddenException";
  }
}
