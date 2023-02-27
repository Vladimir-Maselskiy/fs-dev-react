import { IFSet } from '@/interfaces/interfaces';
import sizeRestrictions from '../../const';

export const checkHeightOnSizeRestrictions = (currentSet: IFSet): boolean => {
  if (currentSet.height)
    if (
      currentSet.height >= sizeRestrictions.maco.minHeight &&
      currentSet.height <= sizeRestrictions.maco.maxHeight
    )
      return true;
  return false;
};
