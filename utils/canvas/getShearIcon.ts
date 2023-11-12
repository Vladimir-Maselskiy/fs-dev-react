import { IFSet } from '@/interfaces/interfaces';
import Icon211694 from '../../public/articlesSVG/211694.svg';
import Icon211695 from '../../public/articlesSVG/211695.svg';
import Icon211696 from '../../public/articlesSVG/211696.svg';
import Icon211698 from '../../public/articlesSVG/211698.svg';

import { getShear } from '../maco/getShear';

export const getShearIcon = (fSet: IFSet): React.ElementType | null => {
  const article = getShear(fSet)[0]?.article;
  if (article === '211695') return Icon211695;
  if (article === '211696') return Icon211696;
  if (article === '211698' || article === '211699') return Icon211698;
  if (article === '211694') return Icon211694;

  return null;
};
