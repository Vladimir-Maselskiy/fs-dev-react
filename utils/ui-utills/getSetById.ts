import { IFSet } from '@/interfaces/interfaces';

export const getSetById = (
  id: string,
  fSetsArray: IFSet[]
): IFSet | undefined => {
  return fSetsArray.find(set => set.id === id);
};
