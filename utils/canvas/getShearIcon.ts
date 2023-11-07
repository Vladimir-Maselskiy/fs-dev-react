import { IFSet } from '@/interfaces/interfaces';
import Icon211695 from '../../public/articlesSVG/211695.svg';

import { getShear } from '../maco/getShear';

export const getShearIcon = (fSet: IFSet): React.ElementType | null => {
  const article = getShear(fSet)[0]?.article;
  if (article === '211695' || article === '211696') return Icon211695;

  return null;
};
