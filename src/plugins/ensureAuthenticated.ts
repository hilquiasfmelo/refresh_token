import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authorizationToken = request.headers.authorization;

  if (!authorizationToken) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authorizationToken.split(' ');

  try {
    verify(token, '5f7f16ef955814b78f2eb519fbbbaf37');

    return next();
  } catch {
    throw new AppError('Token invalid', 401);
  }
}
