import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../utils/mongo/connectMongo';
import { User } from '../../../models/userModel';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import { sendActivationMail } from '@/utils/mongo/sendActivationMail';
import { getUserDto } from '@/utils/mongo/getUserDto';
import { getTokens } from '@/utils/mongo/getTokens';

/**

 */
export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log('user', user);
    if (user) throw new Error(`User with email ${email} already used`);

    const passwordHash = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const newUser = await User.create({
      email,
      password: passwordHash,
      activationLink,
    });
    if (newUser.activationLink)
      await sendActivationMail(newUser.email, newUser.activationLink);
    const userDto = getUserDto(newUser);
    const { accessToken, refreshToken } = getTokens(userDto);
    newUser.accessToken = accessToken;
    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.json({ newUser });
  } catch (error: any) {
    console.log(error.message);
    res.json({ error });
  }
}
