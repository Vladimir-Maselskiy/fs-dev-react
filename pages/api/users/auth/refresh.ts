import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { User } from '@/models/userModel';
import { createError } from '@/utils/mongo/createError';
import { getUserDto } from '@/utils/mongo/getUserDto';
import { getTokens } from '@/utils/mongo/getTokens';
import { setCookie } from 'cookies-next';

export default async function refresh(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { 'fs-refreshToken': refreshToken } = req.cookies;
    const secretKey = process.env.JWT_REFRESH_PWD?.toString();
    if (refreshToken) {
      jwt.verify(refreshToken, secretKey!);
      const user = await User.findOne({ refreshToken });
      if (!user || !user.isActivated)
        throw createError(401, 'User auth error in refresh');
      const userDto = getUserDto(user);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        getTokens(userDto);
      user.accessToken = newAccessToken;
      user.refreshToken = newRefreshToken;
      await user.save();
      setCookie('fs-refreshToken', newRefreshToken, {
        req,
        res,
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      res
        .status(200)
        .json({ user: { ...userDto, accessToken: user.accessToken } });
    }
  } catch (error: any) {
    res.status(401).send(error.message);
  }
}
