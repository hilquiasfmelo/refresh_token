import { sign } from 'jsonwebtoken';

export class GenerateTokenProvider {
  async execute(userId: string) {
    // generating the token
    const token = sign({}, '5f7f16ef955814b78f2eb519fbbbaf37', {
      subject: userId,
      expiresIn: '20s',
    });

    return token;
  }
}
