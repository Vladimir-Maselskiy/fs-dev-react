import { User } from '@/models/userModel';
import { connectMongo } from '@/utils/mongo/connectMongo';
import { createError } from '@/utils/mongo/createError';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function userId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const { userId } = req.query;
    const user = await User.findOne({ _id: userId });
    console.log('user', user);
    if (!user) throw createError(401, 'Error user auth');

    res.status(200).json(user);
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
