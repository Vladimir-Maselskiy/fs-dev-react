import { IUser } from '@/interfaces/interfaces';
import { User } from '@/models/userModel';
import { connectMongo } from '@/utils/mongo/connectMongo';
import { createError } from '@/utils/mongo/createError';
import { getTokens } from '@/utils/mongo/getTokens';
import { getUserDto } from '@/utils/mongo/getUserDto';
import bcrypt from 'bcrypt';
import { deleteCookie } from 'cookies-next';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const { 'fs-refreshToken': refreshToken } = req.cookies;
    const user = await User.findOne({ refreshToken });
    if (!user) throw createError(400, `Bad request`);

    user.refreshToken = null;
    user.save();

    deleteCookie('fs-refreshToken');
    res.status(200).json({ deletedCookies: refreshToken });
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
