import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getBottomEndingForGetriebe(fSet: IFSet) {
  const {
    height,
    isTurnTiltGetriebe = false,
    typeOfOpening = 'type-1',
    isAntiBreakingOpen,
  } = fSet;
  const articleItems: IArticleItem[] = [];

  if (height) {
    if (
      (!isTurnTiltGetriebe && typeOfOpening === 'type-2') ||
      typeOfOpening === 'type-5' ||
      (typeOfOpening === 'type-3' && height <= 800) ||
      isAntiBreakingOpen
    ) {
      return articleItems;
    }

    if ((typeOfOpening === 'type-3' && height >= 800) || height >= 450) {
      const params = {
        brand: 'vorne',
        arr: ['V.0701.0102'],
        sortSignificance: '14',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
  }
  return articleItems;
}
