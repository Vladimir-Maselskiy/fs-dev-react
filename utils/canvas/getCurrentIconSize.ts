import { IFSet } from '@/interfaces/interfaces';
import { getLockItemMacoByArticle } from './getLockItemMacoByArticle';
import { getTotalLengthOfOptionalLocks } from './getTotalLengthOfOptionalLocks';

export const getCurrentIconSize = ({
  fSet,
  article,
  side
}: {
  fSet: IFSet;
  article: string;
  side : "gorizontal" | "vertical"
}) => {
  const optionalLockPropName = side === "gorizontal" ? "optionalGorizontalLock" : "optionalVerticalLock"
  const totalLength = getTotalLengthOfOptionalLocks(
    fSet[optionalLockPropName] || []
  );

  return (getLockItemMacoByArticle(article)!.length / totalLength!) * 100 + '%';
};
