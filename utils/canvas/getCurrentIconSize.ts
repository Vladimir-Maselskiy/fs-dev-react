import { IFSet } from '@/interfaces/interfaces';
import { getLockItemMacoByArticle } from './getLockItemMacoByArticle';
import { getTotalLengthOfOptionalLocks } from './getTotalLengthOfOptionalLocks';

export const getCurrentIconSize = ({
  fSet,
  article,
}: {
  fSet: IFSet;
  article: string;
}) => {
  const totalLength = getTotalLengthOfOptionalLocks(
    fSet.optionalVerticalLock || []
  );

  return (getLockItemMacoByArticle(article)!.length / totalLength!) * 100 + '%';
};
