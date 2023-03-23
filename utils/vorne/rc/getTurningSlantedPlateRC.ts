import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export const getTurningSlantedPlateRC = (fSet: IFSet) => {
  const { systemOfPVC } = fSet;
  const articleItems: IArticleItem[] = [];
  if (systemOfPVC === '9') {
    const params = {
      brand: 'vorne',
      arr: ['V.3301.0102'],
      sortSignificance: '17.1',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  const params = {
    brand: 'vorne',
    arr: ['V.3202.0102'],
    sortSignificance: '17.1',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);
  return articleItems;
};
