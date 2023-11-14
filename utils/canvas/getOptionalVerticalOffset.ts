import { IFSet } from '@/interfaces/interfaces';
import { getTotalLengthOfOptionalLocks } from './getTotalLengthOfOptionalLocks';

export const getOptionalIconsOffset = ({
  fSet,
  index,
  sidePropName,
}: {
  fSet: IFSet;
  index: number;
  sidePropName: 'width' | 'height';
}) => {
  const optionallLockPropName =
    sidePropName === 'width'
      ? 'optionalGorizontalLock'
      : 'optionalVerticalLock';
  const arrayOfPrevElements = fSet[optionallLockPropName]?.slice(0, index);
  if (arrayOfPrevElements?.length === 0) return '0%';
  const totalLength = getTotalLengthOfOptionalLocks(arrayOfPrevElements || []);
  return ((totalLength! + index * 20) / fSet[sidePropName]!) * 100 + '%';
};
