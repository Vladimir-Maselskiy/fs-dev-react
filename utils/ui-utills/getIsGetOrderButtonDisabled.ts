import { IFSet } from '@/interfaces/interfaces';

export const getIsGetOrderButtonDisabled = (fSetsArray: IFSet[]): boolean => {
  if (
    fSetsArray.every(set => {
      if (set.isHeightValid === 'valid' && set.isWidthValid === 'valid')
        return true;
      return false;
    })
  )
    return false;
  return true;
};
