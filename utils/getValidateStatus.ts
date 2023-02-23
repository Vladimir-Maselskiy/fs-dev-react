import { TRestrictions } from '@/const';
import { IFSet } from '@/interfaces/interfaces';

export const getValidateStatus = (
  value: number | undefined,
  field: 'width' | 'height',
  { minWith, minHeight, maxHeight, maxWidth }: TRestrictions
): undefined | 'error' => {
  const [minValue, maxValue] =
    field === 'width' ? [minWith, maxWidth] : [minHeight, maxHeight];

  if (value && value >= minValue && value <= maxValue) {
    return undefined;
  }
  return 'error';
};
