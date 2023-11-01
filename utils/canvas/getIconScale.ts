import { IFSet } from '@/interfaces/interfaces';
import { getDefaultGorizontalLock } from './getDefaultGorizontalLock';
import { getDefaultVerticalLock } from './getDefaultVerticalLock';
import macoLocks from '../../data/locks/maco-locks.json';

export const getIconScale = (
  fSet: IFSet
): { widthScale: number; heightScale: number } => {
  let widthScale = 0;
  let heightScale = 0;
  const currentSide = Math.min(fSet.width!, fSet.height!);
  const defaultGorizontalLock = getDefaultGorizontalLock(fSet);
  const lockByWidth = defaultGorizontalLock?.article;
  const macoArticleByWidth = macoLocks.find(
    item => item.article === lockByWidth
  );
  if (macoArticleByWidth?.length) {
    widthScale = macoArticleByWidth.length / fSet.width!;
  }
  const defaultVerticalLock = getDefaultVerticalLock(fSet);
  const lockByHeight = defaultVerticalLock?.article;
  const macoArticleByHeight = macoLocks.find(
    item => item.article === lockByHeight
  );
  if (macoArticleByHeight?.length) {
    heightScale = macoArticleByHeight.length / fSet.height!;
  }

  return { widthScale, heightScale };
};
