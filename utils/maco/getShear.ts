import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../findElementsByArticle';

export function getShear(fSet: IFSet) {
  const { width, typeOfOpening = 'type-1' } = fSet;
  const articleItems: IArticleItem[] = [];

  if (width) {
    if (typeOfOpening === 'type-3') {
      const params = {
        arr: ['101548'],
        sortSignificance: '1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (typeOfOpening === 'type-2' || typeOfOpening === 'type-5') {
      const params = {
        arr: ['52462'],
        sortSignificance: '1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (width >= 220 && width < 400) {
      const params = {
        arr: ['211694'],
        sortSignificance: '1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width >= 400 && width < 600) {
      const params = {
        arr: ['211695'],
        sortSignificance: '1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width >= 600 && width < 800) {
      const params = {
        arr: ['211696'],
        sortSignificance: '1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width >= 800 && width < 1050) {
      const params = {
        arr: ['211698'],
        sortSignificance: '1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width >= 1050 && width < 1300) {
      const params = {
        arr: ['211699'],
        sortSignificance: '1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
