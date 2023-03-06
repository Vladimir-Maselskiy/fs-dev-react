import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getArticlesForType2(fSet: IFSet) {
  const { isTurnTiltGetriebe, typeOfOpening } = fSet;
  const articleItems: IArticleItem[] = [];
  if (typeOfOpening !== 'type-2' || !isTurnTiltGetriebe) return [];

  const params = {
    arr: ['212686'],
    sortSignificance: '10.4',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);
  return articleItems;
}
