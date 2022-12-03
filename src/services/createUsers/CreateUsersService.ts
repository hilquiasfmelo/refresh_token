import { hash } from 'bcryptjs';

import { prisma } from '../../prisma';
import { IUsersDTO } from '../../dtos/IUsersDTO';
import { AppError } from '../../errors';

export class CreateUsersService {
  async execute({ name, password, username }: IUsersDTO) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 4);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}
