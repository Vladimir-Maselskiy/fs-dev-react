import { IUser } from '@/interfaces/interfaces';

export const getUserDto = (user: IUser) => {
  const { _id, email, isActivated, status } = user;
  return { _id, email, isActivated, status };
};
