import { IArticleItem } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getExtension(length: number) {
  let customLenght = length;
  const articleItems: IArticleItem[] = [];

  while (customLenght > 0) {
    if (customLenght > 150) {
      const params = {
        brand: 'vorne',
        arr: ['V.1102.0202'],
        sortSignificance: '16',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      customLenght -= 400;
      continue;
    }
    if (customLenght > 0) {
      const params = {
        brand: 'vorne',
        arr: ['V.1102.0102'],
        sortSignificance: '16',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      customLenght -= 150;
      continue;
    }
  }
  return articleItems;
}
