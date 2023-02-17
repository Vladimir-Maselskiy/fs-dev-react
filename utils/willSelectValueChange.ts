import { IFSet } from '@/interfaces/interfaces';
import { getPVСSystemSelectOpions } from './getPVСSystemSelectOpions';

export const willSelectValueChange = (
  fSet: IFSet | undefined,
  value: { value: string; label: string } | undefined
): boolean => {
  const posibleOptions = getPVСSystemSelectOpions(fSet);
  if (posibleOptions) {
    const result = posibleOptions.some(option => {
      return option.value === value?.value;
    });
    if (result) return false;
  }
  return true;
};
