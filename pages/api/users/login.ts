import { IUser } from '@/interfaces/interfaces';
import { User } from '@/models/userModel';
import { connectMongo } from '@/utils/mongo/connectMongo';
import { createError } from '@/utils/mongo/createError';
import { getTokens } from '@/utils/mongo/getTokens';
import { getUserDto } from '@/utils/mongo/getUserDto';
import bcrypt from 'bcrypt';
import { setCookie } from 'cookies-next';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError(401, `Invalid password or email`);
    if (!user.activationLink) createError(401, `User data not actvated`);
    if (user.password) {
      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        throw createError(401, 'Invalid password or email');
      }
    }

    const userDto = getUserDto(user);
    const { accessToken, refreshToken } = getTokens(userDto);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    setCookie('fs-refreshToken', refreshToken, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
