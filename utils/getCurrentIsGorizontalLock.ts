import { minGorizontalLockWidthRestrictions } from '@/const';
import { IFSet } from '@/interfaces/interfaces';

export const getCurrentIsGorizontalLock = (
  fSet: IFSet
): boolean => {
  if (fSet && fSet.width) {
    if (fSet.typeOfOpening === 'type-3') return false;
    if (
      fSet.width <
      minGorizontalLockWidthRestrictions[fSet.brand]
    )
      return false;
    if (fSet.width >= 800) return true;
  }
  return false;
};
