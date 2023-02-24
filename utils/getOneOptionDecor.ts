import { IFSet, TDecor } from '@/interfaces/interfaces';
import { decor } from '../const';

export const getOneOptionDecor = (
  currentDecor: TDecor | undefined
): { value: TDecor; label: string } | undefined => {
  return decor.find(el => el.value === currentDecor);
};
