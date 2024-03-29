import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getOneMacoSet } from '../maco/getOneMacoSet';
import { getOneVorneSet } from '../vorne/getOneVorneSet';

export const getFSets = (fSetsArray: IFSet[]): IArticleItem[] => {
  const items: IArticleItem[] = [];
  const res: IArticleItem[] = [];
  fSetsArray.forEach(fSet => {
    if (fSet.brand === 'maco') items.push(...getOneMacoSet(fSet));
    if (fSet.brand === 'vorne') items.push(...getOneVorneSet(fSet));
  });

  items.forEach(originalItem => {
    const index = res.findIndex(item => item.article === originalItem.article);
    if (index !== -1) {
      res[index].quantity = (
        +res[index].quantity + +originalItem.quantity
      ).toString();
      return;
    }
    res.push(originalItem);
  });

  return res.sort((a, b) => {
    if (+a.sortSignificance - +b.sortSignificance === 0) {
      return a.article.localeCompare(b.article);
    } else {
      return +a.sortSignificance - +b.sortSignificance;
    }
  });
};
