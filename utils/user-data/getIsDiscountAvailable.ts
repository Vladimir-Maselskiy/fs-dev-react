import { IUser } from '@/interfaces/interfaces';

export const getIsDiscountAvailable = (user: IUser | null): boolean => {
  if (!user) return false;
  const userStatus = user.status;
  if (
    userStatus === 'manager' ||
    userStatus === 'admin' ||
    userStatus === 'dealer'
  )
    return true;
  return false;
};
