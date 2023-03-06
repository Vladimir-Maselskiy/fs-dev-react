import { IFSet } from '@/interfaces/interfaces';

export const getIndexByFSet = (fSetsArray: IFSet[], fSet: IFSet): number => {
  const index = fSetsArray.findIndex(set => set.id === fSet.id);
  if (index === -1) return fSetsArray.length;
  return index;
};
