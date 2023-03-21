import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

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
    if ((typeOfOpening === 'type-3' && height >= 800) || height >= 450) {
      const params = {
        brand: 'vorne',
        arr: ['V.0701.0102'],
        sortSignificance: '15',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
  }
  return articleItems;
}
