import { IUser } from '@/interfaces/interfaces';

export const getUserDto = (user: IUser) => {
  const { email, status, name } = user;
  return { email, status, name };
};
