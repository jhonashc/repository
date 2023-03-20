export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(public message: string = "An error occurred") {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
