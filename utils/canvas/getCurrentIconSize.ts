import { IFSet } from '@/interfaces/interfaces';
import macoLocks from '../../data/locks/maco-locks.json';

export const getCurrentIconSize = ({
  fSet,
  article,
}: {
  fSet: IFSet;
  article: string;
}) => {
  const arrayOfLocks = fSet.optionalVerticalLock?.map(
    article => macoLocks.find(lockItem => lockItem.article === article)!
  );
  const totalLength = arrayOfLocks?.reduce(
    (acc, lockItem) => acc + lockItem.length,
    0
  );

  return (
    (macoLocks.find(lockItem => lockItem.article === article)!.length /
      totalLength!) *
      100 +
    '%'
  );
};
