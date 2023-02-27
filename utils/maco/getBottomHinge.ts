import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../findElementsByArticle';

export function getBottomHinge(fSet: IFSet) {
  const { isWithoutBottomHinge, typeOfOpening } = fSet;
  const articleItems: IArticleItem[] = [];

  if (isWithoutBottomHinge || typeOfOpening === 'type-3') return articleItems;

  const params = {
    arr: ['52478', '52483'],
    sortSignificance: '12',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);
  return articleItems;
}
