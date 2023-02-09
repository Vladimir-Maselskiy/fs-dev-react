import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';

export const getSetById = (
  id: string
): IFSet | undefined => {
  const { fSetsArray } = useFSetsContext();
  return fSetsArray.find(set => set.id === id);
};
