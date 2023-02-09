import { IFSet } from '@/interfaces/interfaces';

export const setValueOfInputInFSet = (
  value: string,
  fSet: IFSet,
  setFSetsArray: React.Dispatch<
    React.SetStateAction<IFSet[]>
  >,
  fieldName: string
) => {
  setFSetsArray(prev => {
    const index = prev.indexOf(fSet);

    if (fieldName === 'width' || fieldName === 'height')
      prev[index][fieldName] = value;
    return [...prev];
  });
};
