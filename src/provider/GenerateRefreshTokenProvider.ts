import dayjs from 'dayjs';

import { prisma } from '../prisma';

export class GenerateRefreshTokenProvider {
  async execute(userId: string) {
    const expiresIn = dayjs().add(60, 'second').unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshToken;
  }
}
