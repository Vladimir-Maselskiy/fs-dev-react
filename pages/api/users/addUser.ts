import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo } from '../../../utils/mongo/connectMongo';
import { User } from '../../../models/userModel';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { sendActivationMail } from '@/utils/mongo/sendActivationMail';
import { getUserDto } from '@/utils/mongo/getUserDto';
import { getTokens } from '@/utils/mongo/getTokens';
import { createError } from '@/utils/mongo/createError';

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
    if (user) throw createError(422, `User with email ${email} already used`);

    const passwordHash = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const newUser = await User.create({
      email,
      password: passwordHash,
      activationLink,
    });

    const userDto = getUserDto(newUser);
    const { accessToken, refreshToken } = getTokens(userDto);
    newUser.accessToken = accessToken;
    newUser.refreshToken = refreshToken;
    await newUser.save();
    if (newUser.activationLink)
      await sendActivationMail(
        newUser.email,
        `${process.env.API_URL}/api/users/activate/${newUser.activationLink}`
      );
    setCookie('fs-refreshToken', refreshToken, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.json({
      user: { ...userDto, accessToken: newUser.accessToken },
    });
  } catch (error: any) {
    res.status(error.cause || 500).send({ error: error.message });
  }
}
