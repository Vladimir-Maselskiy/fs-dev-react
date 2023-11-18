import { IFSet } from '@/interfaces/interfaces';
import { getDefaultGorizontalLock } from './getDefaultGorizontalLock';
import { getDefaultVerticalLock } from './getDefaultVerticalLock';
import macoLocks from '../../data/tech/maco-tech.json';
import { getTotalLengthOfOptionalLocks } from './getTotalLengthOfOptionalLocks';

export const getLocksIconScale = (
  fSet: IFSet
): { widthScale: number; heightScale: number } => {
  let widthScale = 0;
  let heightScale = 0;

  const totalWidth = fSet.optionalGorizontalLock
    ? getTotalLengthOfOptionalLocks(fSet.optionalGorizontalLock)
    : macoLocks.find(
        item => item.article === getDefaultGorizontalLock(fSet)?.article
      )?.length;
  if (totalWidth) {
    widthScale = totalWidth / fSet.width!;
  }

  const totalHeight = fSet.optionalVerticalLock
    ? getTotalLengthOfOptionalLocks(fSet.optionalVerticalLock)
    : macoLocks.find(
        item => item.article === getDefaultVerticalLock(fSet)?.article
      )?.length;
  if (totalHeight) {
    heightScale = totalHeight / fSet.height!;
  }
  return { widthScale, heightScale };
};
