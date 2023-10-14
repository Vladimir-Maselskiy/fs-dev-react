import { IFSet } from '@/interfaces/interfaces';

export const getIdForNewFSet = (sets: IFSet[]): string => {
  let id = '0';
  if (sets.length > 0) {
    return String(+sets[sets.length - 1].id + 1);
  }
  return id;
};
