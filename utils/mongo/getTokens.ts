import jwt from 'jsonwebtoken';

export const getTokens = (payload: any) => {
  const accessToken = jwt.sign(payload, '123123', {
    expiresIn: '5m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_PWD!, {
    expiresIn: '30d',
  });
  return { accessToken, refreshToken };
};
