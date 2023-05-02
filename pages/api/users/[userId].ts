import { User } from '@/models/userModel';
import { connectMongo } from '@/utils/mongo/connectMongo';
import { createError } from '@/utils/mongo/createError';
import { getIsTokenValid } from '@/utils/mongo/getIsTokenValid';
import { getUserDto } from '@/utils/mongo/getUserDto';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function userId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const { userId } = req.query;
    console.log('userId', userId);
    const authHeader = req.headers.authorization;
    if (!authHeader) throw createError(401, 'Error user auth');
    const token = authHeader.split(' ')[1];
    if (!token) throw createError(401, 'Error user auth');
    try {
      getIsTokenValid(token, 'access');
    } catch (error) {
      throw createError(401, 'Error user auth');
    }

    // const { userId } = req.query;
    const user = await User.findOne({ _id: userId });
    if (!user || !user.isActivated)
      throw createError(401, 'Error user auth user');
    const userDto = getUserDto(user);

    res.status(200).json({ ...userDto, accessToken: user.accessToken });
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
