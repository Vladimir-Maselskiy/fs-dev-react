import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getBottomHinge(fSet: IFSet) {
  const { isWithoutBottomHinge, typeOfOpening } = fSet;
  const articleItems: IArticleItem[] = [];

  if (isWithoutBottomHinge || typeOfOpening === 'type-3') return articleItems;

  const params = {
    brand: 'vorne',
    arr: ['V.1404.0102', 'V.1502.0102'],
    sortSignificance: '18.3',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);
  return articleItems;
}
