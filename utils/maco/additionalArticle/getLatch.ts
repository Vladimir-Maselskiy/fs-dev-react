import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getLatch(fSet: IFSet) {
  const { height } = fSet;
  const articleItems: IArticleItem[] = [];

  if (height) {
    const params = {
      arr: ['52504', '213922'],
      sortSignificance: '3.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    if (height <= 1250) {
      const params = {
        arr: ['34610'],
        sortSignificance: '10.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height <= 1750) {
      const params = {
        arr: ['34610'],
        sortSignificance: '10.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height <= 2250) {
      const params = {
        arr: ['34610'],
        sortSignificance: '10.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 2250) {
      const params = {
        arr: ['34610', '34610'],
        sortSignificance: '10.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
