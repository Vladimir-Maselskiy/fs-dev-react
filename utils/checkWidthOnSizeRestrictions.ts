import { IFSet } from '@/interfaces/interfaces';
import sizeRestrictions from '../const';

export const checkWidthOnSizeRestrictions = (
  currentSet: IFSet
): boolean => {
  if (currentSet.width)
    if (
      +currentSet.width >= sizeRestrictions.maco.minWidth &&
      +currentSet.width <= sizeRestrictions.maco.maxWidth
    )
      return true;
  return false;
};
