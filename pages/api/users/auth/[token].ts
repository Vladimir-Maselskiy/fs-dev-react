import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export default async function accessToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token, tokenType } = req.query;
    const secretKey =
      tokenType === 'refresh'
        ? process.env.JWT_ACCESS_PWD
        : process.env.JWT_REFRESH_PWD;
    if (token && typeof token === 'string') {
      jwt.verify(token, '123123');
      res.status(200).send('token valid');
    }
  } catch (error: any) {
    // NextResponse.next();
    console.log('error.message', error.message);
    res.status(401).send(error.message);
  }
}
