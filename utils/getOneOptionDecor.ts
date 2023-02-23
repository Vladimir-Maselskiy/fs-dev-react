import { IFSet } from '@/interfaces/interfaces';
import { decor } from '../const';

export const getOneOptionDecor = (
  fSet: IFSet | undefined
): { value: string; label: string } | undefined => {
  const res = decor.find(el => el.value === fSet?.decor);
  return res;
};
