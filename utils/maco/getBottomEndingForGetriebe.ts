import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../findElementsByArticle';

export function getBottomEndingForGetriebe(fSet: IFSet) {
  const { height, isTurnTiltGetriebe = false, typeOfOpening = 'type-1' } = fSet;
  const articleItems: IArticleItem[] = [];

  if (height) {
    if (
      (!isTurnTiltGetriebe && typeOfOpening === 'type-2') ||
      typeOfOpening === 'type-5'
    ) {
      return articleItems;
    }
    if (typeOfOpening === 'type-3' && height <= 800) {
      return articleItems;
    }
    if (typeOfOpening === 'type-3' && height >= 800) {
      const params = {
        arr: ['212689'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (height >= 470 && height < 1750) {
      const params = {
        arr: ['212689'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 1750) {
      const params = {
        arr: ['212688'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
