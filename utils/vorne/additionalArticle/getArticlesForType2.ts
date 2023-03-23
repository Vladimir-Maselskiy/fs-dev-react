import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getArticlesForType2(fSet: IFSet) {
  const { isTurnTiltGetriebe, typeOfOpening, isAntiBreakingOpen } = fSet;
  const articleItems: IArticleItem[] = [];
  if (typeOfOpening !== 'type-2' || !isTurnTiltGetriebe || isAntiBreakingOpen)
    return [];

  const params = {
    brand: 'vorne',
    arr: ['V.0702.0102'],
    sortSignificance: '14.2',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);
  return articleItems;
}
