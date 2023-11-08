import { IFSet } from '@/interfaces/interfaces';
import macoLocks from '../../data/locks/maco-locks.json';

export const getOptionalVerticalOffset = ({
  fSet,
  index,
}: {
  fSet: IFSet;
  index: number;
}) => {
  const arrayOfPrevElements = fSet.optionalVerticalLock?.slice(0, index);
  console.log('arrayOfPrevElements', arrayOfPrevElements);
  if (arrayOfPrevElements?.length === 0) return '0%';
  const arrayOfLocks = arrayOfPrevElements?.map(
    article => macoLocks.find(lockItem => lockItem.article === article)!
  );
  const totalLength = arrayOfLocks?.reduce(
    (acc, lockItem) => acc + lockItem.length,
    0
  );
  console.log('totalLength', totalLength);
  return ((totalLength! + index * 20) / fSet.height!) * 100 + '%';
};
