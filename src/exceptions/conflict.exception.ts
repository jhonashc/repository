import { BaseError } from "./base.exception";

export class ConflictException extends BaseError {
  statusCode = 409;
  message: string;

  constructor(message: string = "Conflict") {
    super(message);
    this.message = message;
    this.name = "ConflictException";
  }
}
