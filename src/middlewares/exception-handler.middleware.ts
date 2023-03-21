import { NextFunction, Request, Response } from "express";

import { BaseError } from "../exceptions";

export const exceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof BaseError) {
    const { message, statusCode } = error;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};
