import { BaseError } from "./base.exception";

export class UnauthorizedException extends BaseError {
  statusCode = 401;
  message: string;

  constructor(message: string = "Unauthorized") {
    super(message);
    this.message = message;
    this.name = "UnauthorizedException";
  }
}
