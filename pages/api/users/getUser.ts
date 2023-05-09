import { User } from '@/models/userModel';
import { connectMongo } from '@/utils/mongo/connectMongo';
import { createError } from '@/utils/mongo/createError';
import { getIsTokenValid } from '@/utils/mongo/getIsTokenValid';
import { getUserDto } from '@/utils/mongo/getUserDto';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const authData = req.headers.authorization;
    if (!authData) throw createError(401, 'User auth error');
    const accessToken = authData.split(' ')[1];
    if (!accessToken) throw createError(401, 'User auth error');

    const user = await User.findOne({ accessToken });
    if (!user || !user.isActivated) throw createError(401, 'User auth error');

    await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/auth/${accessToken}`
    );
    res.status(200).json(user);
  } catch (error: any) {
    const status = error.cause || error.response.status;
    const message = error.response?.data || error.message;

    res.status(status || 567).send({ error: message });
  }
}
