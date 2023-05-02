import jwt from 'jsonwebtoken';

export const getIsTokenValid = (
  token: string,
  tokenType: 'access' | 'refresh'
) => {
  const secretKey =
    tokenType === 'access'
      ? process.env.JWT_ACCESS_PWD
      : process.env.JWT_REFRESH_PWD;

  return jwt.verify(token, secretKey!);
};
