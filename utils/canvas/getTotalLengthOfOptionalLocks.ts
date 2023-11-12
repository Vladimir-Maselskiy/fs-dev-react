import { IFSet } from '@/interfaces/interfaces';
import { getLockItemMacoByArticle } from './getLockItemMacoByArticle';

export const getTotalLengthOfOptionalLocks = (locks: string[]): number => {
  return (
    locks.reduce(
      (acc, item) => acc + (getLockItemMacoByArticle(item)?.length || 0),
      0
    ) || 0
  );
};
