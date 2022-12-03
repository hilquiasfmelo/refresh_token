import dayjs from 'dayjs';
import { AppError } from '../../errors';
import { prisma } from '../../prisma';
import { GenerateRefreshTokenProvider } from '../../provider/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

export class RefreshTokenUsersService {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new AppError('Refresh token invalid');
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    );

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      // exclui todos os refresh tokens antigos de um user
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.userId,
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}
