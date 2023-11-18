import { IFSet } from '@/interfaces/interfaces';
import { getDefaultGorizontalLock } from './getDefaultGorizontalLock';
import { getLockItemMacoByArticle } from './getLockItemMacoByArticle';
import { position } from 'styled-system';

export const getCanvasLocksPoint = ({
  fSet,
  side,
}: {
  fSet: IFSet;
  side: 'gorizontal' | 'vertical';
}): number[] => {
  const optionalLockPropName =
    side === 'gorizontal' ? 'optionalGorizontalLock' : 'optionalVerticalLock';
  if (!fSet[optionalLockPropName]) {
    const articleItem = getDefaultGorizontalLock(fSet);
    const lockItem = getLockItemMacoByArticle(articleItem.article);
    return [...lockItem?.VZ!];
  }

  const currentPoints: number[] = [];
  fSet[optionalLockPropName]?.reduce((acc, article) => {
    const lockItem = getLockItemMacoByArticle(article);
    if (lockItem && lockItem.VZ.length! > 0) {
      const curretPosition = lockItem.VZ.map(
        lockPosition => lockPosition + acc
      );
      currentPoints.push(...curretPosition);
    }
    return acc + lockItem?.length!;
  }, 0);
  return currentPoints;
};
