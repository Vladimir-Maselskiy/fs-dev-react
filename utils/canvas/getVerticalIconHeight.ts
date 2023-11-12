import { IFSet } from '@/interfaces/interfaces';
import { getLocksIconScale } from './getLocksIconScale';

export const getVerticalIconHeight = (fSet: IFSet) => {
  const scale = getLocksIconScale(fSet);
  return `${scale.heightScale * 100}%`;
};
