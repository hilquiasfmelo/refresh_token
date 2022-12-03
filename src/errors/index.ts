import { NextFunction, Request, Response } from 'express';

export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const errors = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error: ${error.message}`,
  });
};
