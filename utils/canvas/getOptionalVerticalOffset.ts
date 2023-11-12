import { IFSet } from '@/interfaces/interfaces';
import { getTotalLengthOfOptionalLocks } from './getTotalLengthOfOptionalLocks';

export const getOptionalVerticalOffset = ({
  fSet,
  index,
}: {
  fSet: IFSet;
  index: number;
}) => {
  const arrayOfPrevElements = fSet.optionalVerticalLock?.slice(0, index);
  if (arrayOfPrevElements?.length === 0) return '0%';
  const totalLength = getTotalLengthOfOptionalLocks(arrayOfPrevElements || []);
  return ((totalLength! + index * 20) / fSet.height!) * 100 + '%';
};
