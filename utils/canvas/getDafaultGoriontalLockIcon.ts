import { IFSet } from '@/interfaces/interfaces';
import { getDefaultGorizontalLock } from './getDefaultGorizontalLock';
import Icon211924WR from '../../public/articlesSVG/211924w-r.svg';
import Icon211924WL from '../../public/articlesSVG/211924w-l.svg';

export const getDafaultGoriontalLockIcon = (fSet: IFSet) => {
  const defaultGorizontalLock = getDefaultGorizontalLock(fSet);
  const article = defaultGorizontalLock?.article;
  if (
    (article === '211924' || article === '228398' || article === '211925') &&
    fSet.sideOfHinge === 'right'
  )
    return Icon211924WR;
  if (
    (article === '211924' || article === '228398' || article === '211925') &&
    fSet.sideOfHinge === 'left'
  )
    return Icon211924WL;

  return null;
};
