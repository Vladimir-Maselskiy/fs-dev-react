import { IFSet } from '@/interfaces/interfaces';
import { getLockItemMacoByArticle } from './getLockItemMaco';

export const getTotalLengthOfVerticalOptionalLocks = (fSet: IFSet): number => {
  return (
    fSet.optionalVerticalLock?.reduce(
      (acc, item) => acc + (getLockItemMacoByArticle(item)?.length || 0),
      0
    ) || 0
  );
};
