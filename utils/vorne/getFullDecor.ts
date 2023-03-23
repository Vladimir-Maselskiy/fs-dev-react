import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getFullDecor(fSet: IFSet) {
  const articleItems: IArticleItem[] = [];
  const { decor } = fSet;

  if (decor === 'white') {
    const params = {
      brand: 'vorne',
      arr: ['V.4501.0107'],
      sortSignificance: '19.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  if (decor === 'brown') {
    const params = {
      brand: 'vorne',
      arr: ['V.4001.0108'],
      sortSignificance: '19.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  if (decor === 'black') {
    const params = {
      brand: 'vorne',
      arr: ['V.4501.0116'],
      sortSignificance: '19.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  return articleItems;
}
