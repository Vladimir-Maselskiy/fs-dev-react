import { IFSet } from '@/interfaces/interfaces';
import { getLockItemMaco } from './getLockItemMaco';

export const getOptionalVerticalOffset = ({
  fSet,
  index,
}: {
  fSet: IFSet;
  index: number;
}) => {
  const arrayOfPrevElements = fSet.optionalVerticalLock?.slice(0, index);
  if (arrayOfPrevElements?.length === 0) return '0%';
  const arrayOfLocks = arrayOfPrevElements?.map(
    article => getLockItemMaco(article)!
  );
  const totalLength = arrayOfLocks?.reduce(
    (acc, lockItem) => acc + lockItem.length,
    0
  );
  return ((totalLength! + index * 20) / fSet.height!) * 100 + '%';
};
