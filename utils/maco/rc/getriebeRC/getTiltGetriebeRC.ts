import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export const getTiltGetriebeRC = (fSet: IFSet) => {
  const { height, width } = fSet;
  const articleItems: IArticleItem[] = [];

  if (width && height) {
    if (width >= 470 && width <= 800) {
      const params = {
        arr: ['201746'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }

    if (width > 800 && width <= 1250) {
      const params = {
        arr: ['201747'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width > 1250 && width <= 1750) {
      const params = {
        arr: ['201748'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width > 1750) {
      const params = {
        arr: ['202739'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
};
