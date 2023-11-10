import { TRestrictions } from '@/const';

export const getValidateStatus = (
  value: number | undefined,
  field: 'width' | 'height',
  { minWith, minHeight, maxHeight, maxWidth }: TRestrictions
): 'valid' | 'invalid' => {
  const [minValue, maxValue] =
    field === 'width' ? [minWith, maxWidth] : [minHeight, maxHeight];

  if (value && value >= minValue && value <= maxValue) {
    return 'valid';
  }
  return 'invalid';
};
