import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateUsersService } from './CreateUsersService';

export class CreateUsersController {
  async handle(request: Request, response: Response) {
    const createUserBody = z.object({
      name: z.string(),
      username: z.string(),
      password: z.string(),
    });

    const { name, username, password } = createUserBody.parse(request.body);

    const createUsersService = new CreateUsersService();

    const user = await createUsersService.execute({
      name,
      username,
      password,
    });

    return response.status(201).json(user);
  }
}
