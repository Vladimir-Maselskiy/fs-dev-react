import { IFSet } from '@/interfaces/interfaces';
import { getDefaultVerticalLock } from './getDefaultVerticalLock';
import Icon211924 from '../../public/articlesSVG/211924.svg';
import Icon211926 from '../../public/articlesSVG/211926.svg';
import Icon211928 from '../../public/articlesSVG/211928.svg';
import Icon215272 from '../../public/articlesSVG/215272.svg';

export const getVerticalLockIcon = (
  data: IFSet | string
): React.ElementType | null => {
  const article =
    typeof data === 'string' ? data : getDefaultVerticalLock(data)?.article;
  if (article === '228398' || article === '211924' || article === '211925')
    return Icon211924;

  if (article === '211926' || article === '211927') return Icon211926;

  if (article === '211928') return Icon211928;
  if (article === '215272') return Icon215272;

  return null;
};
