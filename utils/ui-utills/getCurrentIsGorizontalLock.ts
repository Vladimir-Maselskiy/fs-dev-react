import { minGorizontalLockWidthRestrictions } from '@/const';
import { TBrands, TTypeOfOpenimg } from '@/interfaces/interfaces';

export const getCurrentIsGorizontalLock = (
  width: number,
  typeOfOpening: TTypeOfOpenimg,
  brand: TBrands,
  isGorizontalLock: boolean
): boolean => {
  if (typeOfOpening === 'type-3') return false;
  if (isGorizontalLock) return true;
  if (width < minGorizontalLockWidthRestrictions[brand]) return false;
  if (width >= 800) return true;

  return false;
};
