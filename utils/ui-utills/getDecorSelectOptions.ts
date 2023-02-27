import { decor, decorBase, decorBlack } from '@/const';
import { TBrands, TDecor } from '@/interfaces/interfaces';

export const getDecorSelectOptions = (
  brand: TBrands | undefined
): { value: TDecor; label: string }[] | undefined => {
  if (brand === 'maco') return [...decor];
  if (brand === 'vorne') return [...decorBase, ...decorBlack];
  if (brand === 'winkhaus') return [...decor];
};
