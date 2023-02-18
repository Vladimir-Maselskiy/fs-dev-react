import { IFSet } from '@/interfaces/interfaces';
import { getSetById } from './getSetById';
import { getSetRestrictions } from './getSetRestrictions';
import { getValidateStatus } from './getValidateStatus';

export const getValidateStatusOfWidthOrHeight = (
  id: string,
  fSetsArray: IFSet[],
  fieldName: 'width' | 'height'
) => {
  const fSet = getSetById(id, fSetsArray);
  if (fSet) {
    return getValidateStatus(
      fSet,
      fieldName,
      getSetRestrictions(fSet)
    );
  }
};
