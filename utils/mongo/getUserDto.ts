import { IUser } from '@/interfaces/interfaces';

export const getUserDto = (user: IUser) => {
  const { _id: id, email, isActivated } = user;
  return { id, email, isActivated };
};
