import { Router } from 'express';

import { ensureAuthenticated } from '../plugins/ensureAuthenticated';

import { AuthenticateUsersController } from '../services/authenticateUsers/AuthenticateUsersController';
import { RefreshTokenUsersController } from '../services/refreshTokenUsers/RefreshTokenUsersController';
import { CreateUsersController } from '../services/createUsers/CreateUsersController';

export const routes = Router();

routes.post('/users', new CreateUsersController().handle);
routes.post('/session', new AuthenticateUsersController().handle);

routes.post('/refresh-token', new RefreshTokenUsersController().handle);

routes.get('/courses', ensureAuthenticated, (request, response) => {
  response.json([
    { id: 1, name: 'Node' },
    { id: 2, name: 'React' },
    { id: 3, name: 'React Native' },
    { id: 4, name: 'TypeScript' },
    { id: 5, name: 'Prisma' },
  ]);
});
