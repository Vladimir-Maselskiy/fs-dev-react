import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';
import { getExtension } from './additionalArticle/getExtension';

export function getVerticalLocks(fSet: IFSet) {
  const { width, height, typeOfOpening, isAntiBreakingOpen } = fSet;
  const articleItems: IArticleItem[] = [];
  if (height) {
    if (
      typeOfOpening === 'type-3' &&
      isAntiBreakingOpen &&
      height >= 600 &&
      width! >= 450
    ) {
      const extension = getExtension(height - 600);
      if (extension.length > 0) articleItems.push(...extension, ...extension);
      return articleItems;
    }

    if (typeOfOpening === 'type-3' && height >= 800 && width! >= 450) {
      let article = '';
      if (height <= 1200) {
        article = 'V.0801.0302';
      } else if (height <= 1700) {
        article = 'V.0801.0402';
      } else {
        article = 'V.0801.0502';
      }
      const params = {
        brand: 'vorne',
        arr: [article, article],
        sortSignificance: '15',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }

    if (typeOfOpening === 'type-3') return articleItems;

    if (height <= 800) {
      const params = {
        brand: 'vorne',
        arr: ['V.0801.0202'],
        sortSignificance: '15',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 800 && height <= 1200) {
      const params = {
        brand: 'vorne',
        arr: ['V.0801.0302'],
        sortSignificance: '15',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 1200 && height <= 1700) {
      const params = {
        brand: 'vorne',
        arr: ['V.0801.0402'],
        sortSignificance: '15',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 2200) {
      const params = {
        brand: 'vorne',
        arr: ['V.0801.0502'],
        sortSignificance: '15',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
