import { IUser } from '@/interfaces/interfaces';
import { connectMongo } from '@/utils/mongo/connectMongo';
import { sendActivationMail } from '@/utils/mongo/sendActivationMail';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function resendActivationLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();
  const user: IUser = req.body;

  console.log(user);
  if (user) {
    await sendActivationMail(
      user.email,
      `${process.env.API_URL}/api/users/activate/${user.activationLink}`
    );
    console.log('resend link');
    res.json({ resend: 'ok' });
  }
}
