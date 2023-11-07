import { IFSet } from '@/interfaces/interfaces';
import { getDefaultVerticalLock } from './getDefaultVerticalLock';
import Icon211924 from '../../public/articlesSVG/211924.svg';
import Icon211926 from '../../public/articlesSVG/211926.svg';
import Icon211928 from '../../public/articlesSVG/211928.svg';

export const getDafaultVerticalLockIcon = (
  fSet: IFSet
): React.ElementType | null => {
  const defaultVerticalLock = getDefaultVerticalLock(fSet);
  const article = defaultVerticalLock?.article;
  if (article === '228398' || article === '211924' || article === '211925')
    return Icon211924;

  if (article === '211926' || article === '211927') return Icon211926;

  if (article === '211928') return Icon211928;

  return null;
};
