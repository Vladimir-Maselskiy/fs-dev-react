import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/findElementsByArticle';

export function getTurningGetgriebe(fSet: IFSet) {
  const { height } = fSet;
  const articleItems: IArticleItem[] = [];

  if (height) {
    if (height >= 300 && height <= 500) {
      const params = {
        arr: ['211989'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 500 && height <= 700) {
      const params = {
        arr: ['211990'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 700 && height <= 1000) {
      const params = {
        arr: ['211991'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 1000 && height <= 1400) {
      const params = {
        arr: ['211992'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 1400 && height <= 1800) {
      const params = {
        arr: ['211993'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 1800) {
      const params = {
        arr: ['211994'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
