import { User } from '@/models/userModel';
import { connectMongo } from '@/utils/mongo/connectMongo';
import { createError } from '@/utils/mongo/createError';
import { getTokens } from '@/utils/mongo/getTokens';
import { getUserDto } from '@/utils/mongo/getUserDto';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getUserWithGoogleAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const body = req.body;
    if (body) {
      const { email, image, name } = body;
      if (!email) createError(400, 'bad request');
      const user = await User.findOne({ email });
      if (user) {
        const userDto = getUserDto(user);
        const { accessToken, refreshToken } = getTokens(userDto);
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json(user);
      }
      if (!user) {
        const newUser = await User.create({
          email,
          name,
          isActivated: true,
          image,
        });
        const userDto = getUserDto(newUser);
        const { accessToken, refreshToken } = getTokens(userDto);
        newUser.accessToken = accessToken;
        newUser.refreshToken = refreshToken;
        await newUser.save();
        return res.status(200).json(newUser);
      }
    } else createError(400, 'bad request');

    res.status(200).json({});
  } catch (error: any) {
    console.log('error', error);
    const status = error.cause || error.response?.status;
    const message = error.response?.data || error.message;

    res.status(status || 500).send({ error: message });
  }
  //
}
