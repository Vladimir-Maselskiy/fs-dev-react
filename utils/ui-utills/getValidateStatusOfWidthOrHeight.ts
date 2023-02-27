import { IFSet, TBrands, TTypeOfOpenimg } from '@/interfaces/interfaces';
import { getSetById } from './getSetById';
import { getSetRestrictions } from './getSetRestrictions';
import { getValidateStatus } from './getValidateStatus';

export const getValidateStatusOfWidthOrHeight = (
  brand: TBrands,
  typeOfOpening: TTypeOfOpenimg,
  value: number,
  fieldName: 'width' | 'height'
) => {
  return getValidateStatus(
    value,
    fieldName,
    getSetRestrictions(typeOfOpening, brand)
  );
};
