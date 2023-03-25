import { BaseError } from "./base.exception";

export class NotFoundException extends BaseError {
  statusCode = 404;
  message: string;

  constructor(message: string = "Not Found") {
    super(message);
    this.message = message;
    this.name = "NotFoundException";
  }
}
