import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';
import { getExtension } from './additionalArticle/getExtension';

export function getShear(fSet: IFSet) {
  const { width, typeOfOpening = 'type-1' } = fSet;
  const articleItems: IArticleItem[] = [];

  if (width) {
    if (typeOfOpening === 'type-3') {
      const params = {
        brand: 'vorne',
        arr: ['V.0501.0102'],
        sortSignificance: '11',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (typeOfOpening === 'type-2' || typeOfOpening === 'type-5') {
      const params = {
        brand: 'vorne',
        arr: ['V.1803.0102'],
        sortSignificance: '11',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (width >= 280 && width <= 600) {
      const params = {
        brand: 'vorne',
        arr: ['V.0401.0102'],
        sortSignificance: '11',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width > 600 && width <= 850) {
      const params = {
        brand: 'vorne',
        arr: ['V.0401.0402'],
        sortSignificance: '11',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width > 850 && width <= 1100) {
      const params = {
        brand: 'vorne',
        arr: ['V.0401.0502'],
        sortSignificance: '11',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width > 1100) {
      const extension = getExtension(width - 1100);
      if (extension.length > 0) articleItems.push(...extension);
    }
  }
  return articleItems;
}
