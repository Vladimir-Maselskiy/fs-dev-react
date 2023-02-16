import { TRestrictions } from '@/const';
import { IFSet } from '@/interfaces/interfaces';

export const getValidateStatus = (
  fSet: IFSet,
  field: 'width' | 'height',
  { minWith, minHeight, maxHeight, maxWidth }: TRestrictions
): undefined | 'error' => {
  if (field === 'width' && fSet.width) {
    if (fSet.width >= minWith && fSet.width <= maxWidth) {
      return undefined;
    } else return 'error';
  }
  if (field === 'height' && fSet.height) {
    if (
      fSet.height >= minHeight &&
      fSet.height <= maxHeight
    ) {
      return undefined;
    } else return 'error';
  }
  return 'error';
};
