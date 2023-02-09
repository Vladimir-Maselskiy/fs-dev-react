import { IFSet } from '@/interfaces/interfaces';

export const setInputValidation = (
  isValid: boolean,
  setFSetsArray: React.Dispatch<
    React.SetStateAction<IFSet[]>
  >,
  fSet: IFSet,
  fieldName: string
) => {
  setFSetsArray(prev => {
    const index = prev.indexOf(fSet);
    if (
      fieldName === 'isWidthValid' ||
      fieldName === 'isHeightValid'
    )
      prev[index][fieldName] = isValid;
    return [...prev];
  });
  setTimeout(() => console.log(fSet), 200);
};
