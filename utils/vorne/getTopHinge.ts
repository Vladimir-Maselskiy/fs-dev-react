import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getTopHinge(fSet: IFSet) {
  const { systemOfPVC } = fSet;
  const articleItems: IArticleItem[] = [];

  const params = {
    arr: ['V.1301.0102'],
    sortSignificance: '18.3',
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
      arr: ['V.1202.0102'],
      sortSignificance: '18.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }

  if (systemOfPVC === '9') {
    const params = {
      arr: ['V.1201.0102'],
      sortSignificance: '18.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  return articleItems;
}
