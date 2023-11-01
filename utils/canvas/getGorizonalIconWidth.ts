import { IFSet } from '@/interfaces/interfaces';
import { getIconScale } from './getIconScale';

export const getGorizonalIconWidth = (fSet: IFSet) => {
  const scale = getIconScale(fSet);
  console.log('scaleIn getGorizonalIconWidth', scale);
  return `${scale.widthScale * 100}%`;
};
