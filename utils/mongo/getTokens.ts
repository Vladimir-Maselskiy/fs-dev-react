import jwt from 'jsonwebtoken';

export const getTokens = (payload: any) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_PWD!, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_PWD!, {
    expiresIn: '30d',
  });
  return { accessToken, refreshToken };
};
