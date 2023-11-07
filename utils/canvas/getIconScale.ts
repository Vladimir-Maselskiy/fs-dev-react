import { IFSet } from '@/interfaces/interfaces';
import { getDefaultGorizontalLock } from './getDefaultGorizontalLock';
import { getDefaultVerticalLock } from './getDefaultVerticalLock';
import macoLocks from '../../data/locks/maco-locks.json';

export const getIconScale = (
  fSet: IFSet
): { widthScale: number; heightScale: number } => {
  let widthScale = 0;
  let heightScale = 0;

  const totalWidth = fSet.optionalGorizontalLock
    ? fSet.optionalGorizontalLock.reduce((acc, article) => {
        return macoLocks.find(item => item.article === article)?.length! + acc;
      }, 0)
    : macoLocks.find(
        item => item.article === getDefaultGorizontalLock(fSet)?.article
      )?.length;
  if (totalWidth) {
    widthScale = totalWidth / fSet.width!;
  }

  const totalHeight = fSet.optionalVerticalLock
    ? fSet.optionalVerticalLock.reduce((acc, article) => {
        return macoLocks.find(item => item.article === article)?.length! + acc;
      }, 0)
    : macoLocks.find(
        item => item.article === getDefaultVerticalLock(fSet)?.article
      )?.length;
  if (totalHeight) {
    heightScale = totalHeight / fSet.height!;
  }
  return { widthScale, heightScale };
};
