import { compare } from 'bcryptjs';

import { GenerateRefreshTokenProvider } from '../../provider/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

import { AppError } from '../../errors';
import { prisma } from '../../prisma';

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUsersService {
  async execute({ username, password }: IRequest) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new AppError('User or password incorrect', 404);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('User or password incorrect');
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(user.id);

    await prisma.refreshToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const generateRefreshToken = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshToken.execute(user.id);

    return {
      token,
      refreshToken,
    };
  }
}
