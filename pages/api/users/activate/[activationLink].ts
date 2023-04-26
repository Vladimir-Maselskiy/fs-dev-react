import { IUser } from '@/interfaces/interfaces';
import { User } from '@/models/userModel';
import { connectMongo } from '@/utils/mongo/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function activationLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const { activationLink } = req.query;
    const user = await User.findOne({ activationLink });
    if (!user) throw new Error('Error user activate');
    user.isActivated = true;
    await user.save();
    console.log(user, user);
    res.redirect(`${process.env.API_URL}`);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}
