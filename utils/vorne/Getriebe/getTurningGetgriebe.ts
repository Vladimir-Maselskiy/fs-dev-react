import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getTurningGetgriebe(fSet: IFSet) {
  const { height } = fSet;
  const articleItems: IArticleItem[] = [];

  if (height) {
    if (height >= 300 && height <= 400) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0102M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } 
    if (height > 400 && height <= 600) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0202M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } 
    else if (height > 600 && height <= 800) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0302M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (height > 800 && height <= 1000) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0402M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (height > 1000 && height <= 1200) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0502M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (height > 1200 && height <= 1400) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0602M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (height > 1400 && height <= 1600) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0702M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (height > 1600 && height <= 1800) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0902M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (height > 1800 && height <= 2000) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.1102M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (height > 2000) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.1202M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
