import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getOneMacoSet } from '../maco/getOneMacoSet';
import maco from '../../data/maco.json';

export const getFSets = (fSetsArray: IFSet[]): IArticleItem[] => {
  const items: IArticleItem[] = [];
  const res: IArticleItem[] = [];
  fSetsArray.forEach(fSet => {
    if (fSet.brand === 'maco') items.push(...getOneMacoSet(fSet));
  });

  items.forEach(originalItem => {
    const index = res.findIndex(item => item.article === originalItem.article);
    if (index !== -1) {
      res[index].quantity = (+res[index].quantity + 1).toString();
      return;
    }
    res.push(originalItem);
  });

  return res.sort((a, b) => {
    if (+a.sortSignificance - +b.sortSignificance === 0) {
      return +a.article - +b.article;
    } else {
      return +a.sortSignificance - +b.sortSignificance;
    }
  });
};