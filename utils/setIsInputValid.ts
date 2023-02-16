import { IFSet } from '@/interfaces/interfaces';
import { getSetById } from './getSetById';
import { getSetRestrictions } from './getSetRestrictions';
import { getValidateStatus } from './getValidateStatus';

export const setIsInputValid = (
  fSetsArray: IFSet[],
  setFSetsArray: React.Dispatch<
    React.SetStateAction<IFSet[]>
  >,
  id: string,
  fieldName: 'isWidthValid' | 'isHeightValid'
) => {
  const fSet = getSetById(id, fSetsArray);
  if (fSet) {
    const field =
      fieldName === 'isWidthValid' ? 'width' : 'height';
    const isValid = getValidateStatus(
      fSet,
      field,
      getSetRestrictions(fSet)
    );
    setFSetsArray(prev => {
      const index = prev.indexOf(fSet);
      if (
        fieldName === 'isWidthValid' ||
        fieldName === 'isHeightValid'
      )
        prev[index][fieldName] =
          isValid === undefined ? 'valid' : 'invalid';
      return [...prev];
    });
  }
};