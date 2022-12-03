import { Request, Response } from 'express';
import { z } from 'zod';

import { RefreshTokenUsersService } from './RefreshTokenUsersService';

export class RefreshTokenUsersController {
  async handle(request: Request, response: Response) {
    const createRefreshTokenBody = z.object({
      refresh_token: z.string(),
    });

    const { refresh_token } = createRefreshTokenBody.parse(request.body);

    const refreshTokenUsersService = new RefreshTokenUsersService();

    const token = await refreshTokenUsersService.execute(refresh_token);

    return response.status(201).json(token);
  }
}
