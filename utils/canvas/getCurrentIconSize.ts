import { IFSet } from '@/interfaces/interfaces';
import { getLockItemMaco } from './getLockItemMaco';

export const getCurrentIconSize = ({
  fSet,
  article,
}: {
  fSet: IFSet;
  article: string;
}) => {
  const arrayOfLocks = fSet.optionalVerticalLock?.map(
    article => getLockItemMaco(article)!
  );
  const totalLength = arrayOfLocks?.reduce(
    (acc, lockItem) => acc + lockItem.length,
    0
  );

  return (getLockItemMaco(article)!.length / totalLength!) * 100 + '%';
};
