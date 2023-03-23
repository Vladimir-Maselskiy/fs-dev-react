import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getTopHinge(fSet: IFSet) {
  const { systemOfPVC, typeOfOpening } = fSet;
  const articleItems: IArticleItem[] = [];

  const params = {
    arr: ['52480', '94491'],
    sortSignificance: '8.3',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);

  if (
    systemOfPVC === '13' ||
    systemOfPVC === 'Salamander' ||
    systemOfPVC === 'Rehau' ||
    systemOfPVC === 'Veka'
  ) {
    const params = {
      arr: ['52486'],
      sortSignificance: '8.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }

  if (systemOfPVC === '9') {
    const params = {
      arr: ['52487'],
      sortSignificance: '8.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  return articleItems;
}
