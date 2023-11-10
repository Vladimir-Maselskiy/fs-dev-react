import { IFSet } from '@/interfaces/interfaces';
import { getIconScale } from './getIconScale';

export const getVerticalIconHeight = (fSet: IFSet) => {
  const scale = getIconScale(fSet);
  return `${scale.heightScale * 100}%`;
};
