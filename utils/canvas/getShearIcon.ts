import { IFSet } from '@/interfaces/interfaces';
import { getDefaultVerticalLock } from './getDefaultVerticalLock';
import Icon211695 from '../../public/articlesSVG/211695.svg';
import Icon211924HL from '../../public/articlesSVG/211924h-l.svg';
import Icon211926HR from '../../public/articlesSVG/211926h-r.svg';
import Icon211926HL from '../../public/articlesSVG/211926h-l.svg';
import Icon211928HR from '../../public/articlesSVG/211928h-r.svg';
import Icon211928HL from '../../public/articlesSVG/211928h-l.svg';
import { getShear } from '../maco/getShear';

export const getShearIcon = (fSet: IFSet): React.ElementType | null => {
  const article = getShear(fSet)[0]?.article;
  if (article === '211695' || article === '211696') return Icon211695;
  if (
    (article === '228398' || article === '211924' || article === '211925') &&
    fSet.sideOfHinge === 'left'
  )
    return Icon211924HL;
  if (
    (article === '211926' || article === '211927') &&
    fSet.sideOfHinge === 'left'
  )
    return Icon211926HL;
  if (
    (article === '211926' || article === '211927') &&
    fSet.sideOfHinge === 'right'
  )
    return Icon211926HR;
  if (article === '211928' && fSet.sideOfHinge === 'left') return Icon211928HL;
  if (article === '211928' && fSet.sideOfHinge === 'right') return Icon211928HR;

  return null;
};
