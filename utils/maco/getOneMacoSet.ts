import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getConerGear } from './getConerGear';
import { getGetriebe } from './Getriebe/getGetriebe';

export const getOneMacoSet = (fSet: IFSet): IArticleItem[] => {
  const currentSet: IArticleItem[] = [];
  if (fSet.height && fSet.width) {
    const getribe = getGetriebe(fSet);
    const conerGear = getConerGear(fSet);
    currentSet.push(...getribe, ...conerGear);
  }

  return currentSet;
};
