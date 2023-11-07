import { IFSet } from '@/interfaces/interfaces';
import { getDefaultGorizontalLock } from './getDefaultGorizontalLock';
import Icon211924 from '../../public/articlesSVG/211924.svg';

export const getDafaultGoriontalLockIcon = (fSet: IFSet) => {
  const defaultGorizontalLock = getDefaultGorizontalLock(fSet);
  const article = defaultGorizontalLock?.article;
  if (
    (article === '211924' || article === '228398' || article === '211925') &&
    fSet.sideOfHinge === 'right'
  )
    return Icon211924;
  if (
    (article === '211924' || article === '228398' || article === '211925') &&
    fSet.sideOfHinge === 'left'
  )
    return Icon211924;

  return null;
};
