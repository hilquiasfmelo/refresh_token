import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticateUsersService } from './AuthenticateUsersService';

export class AuthenticateUsersController {
  async handle(request: Request, response: Response) {
    const authenticateUserBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = authenticateUserBody.parse(request.body);

    const authenticateUsersService = new AuthenticateUsersService();

    const token = await authenticateUsersService.execute({
      username,
      password,
    });

    return response.status(200).json(token);
  }
}
