import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../utils/mongo/connectMongo';
import { User } from '../../../models/userModel';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const user = await User.create(req.body);
    res.json({ user });
  } catch (error: any) {
    console.log(error.message);
    res.json({ error });
  }
}
