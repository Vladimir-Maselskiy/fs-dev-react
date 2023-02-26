import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getOneMacoSet } from './maco/getOneMacoSet';
import maco from '../data/maco.json';

export const getFSets = (fSetsArray: IFSet[]): IArticleItem[] => {
  const res: IArticleItem[] = [];
  fSetsArray.forEach(fSet => {
    if (fSet.brand === 'maco') getOneMacoSet(fSet);
  });

  return res;
};
