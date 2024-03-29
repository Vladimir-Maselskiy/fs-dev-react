import { IArticleItem } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getExtension(length: number) {
  let customLenght = length;
  const articleItems: IArticleItem[] = [];

  while (customLenght > 0) {
    if (customLenght > 235) {
      const params = {
        arr: ['215272'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      customLenght -= 470;
      continue;
    }
    if (customLenght > 141) {
      const params = {
        arr: ['214711'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      customLenght -= 235;
      continue;
    }
    if (customLenght > 0) {
      const params = {
        arr: ['206630'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      customLenght -= 140;
    }
  }
  return articleItems;
}
