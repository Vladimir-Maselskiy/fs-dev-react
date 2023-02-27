import { TBrands, TDecor } from '@/interfaces/interfaces';
import { getDecorSelectOptions } from './getDecorSelectOptions';

export const willDecorSelecteValueChange = (
  brand: TBrands | undefined,
  value: TDecor | undefined
): boolean => {
  const posibleOptions = getDecorSelectOptions(brand);
  if (posibleOptions) {
    const result = posibleOptions.some(option => {
      return option.value === value;
    });
    return !result;
  }
  return true;
};
