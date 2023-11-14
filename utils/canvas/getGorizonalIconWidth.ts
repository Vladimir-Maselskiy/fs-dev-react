import { IFSet } from '@/interfaces/interfaces';
import { getLocksIconScale } from './getLocksIconScale';

export const getGorizonalIconWidth = (fSet: IFSet) => {
  const scale = getLocksIconScale(fSet);

  return `${scale.widthScale * 100}%`;
};
