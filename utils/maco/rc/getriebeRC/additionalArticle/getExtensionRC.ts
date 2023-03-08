import { IArticleItem } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getExtensionRC(length: number) {
  let customLenght = length;
  const articleItems: IArticleItem[] = [];

  while (customLenght > 0) {
    if (customLenght > 235) {
      const params = {
        arr: ['201840'],
        sortSignificance: '7',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      customLenght -= 470;
      continue;
    }
    if (customLenght > 141) {
      const params = {
        arr: ['201750'],
        sortSignificance: '7',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      customLenght -= 235;
      continue;
    }
  }
  return articleItems;
}
