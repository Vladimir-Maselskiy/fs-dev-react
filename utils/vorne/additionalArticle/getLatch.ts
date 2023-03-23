import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getLatch(fSet: IFSet) {
  const { height } = fSet;
  const articleItems: IArticleItem[] = [];

  if (height) {
    const params = {
      brand: 'vorne',
      arr: ['V.2002.0102', 'V.2001.0102'],
      sortSignificance: '13.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  return articleItems;
}
