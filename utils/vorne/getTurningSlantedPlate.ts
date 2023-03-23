import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getTurningSlantedPlate(fSet: IFSet) {
  const {
    systemOfPVC,
    sideOfHinge,
    typeOfOpening = 'type-1',
    isTurnTiltGetriebe = false,
  } = fSet;
  const articleItems: IArticleItem[] = [];

  if (
    (typeOfOpening === 'type-2' && !isTurnTiltGetriebe) ||
    typeOfOpening === 'type-3' ||
    typeOfOpening === 'type-4' ||
    typeOfOpening === 'type-5'
  ) {
    return articleItems;
  }

  if (systemOfPVC === '9') {
    const params = {
      brand: 'vorne',
      arr: ['V.2301.0102'],
      sortSignificance: '17.1',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  const params = {
    brand: 'vorne',
    arr: ['V.2219.0102'],
    sortSignificance: '17.1',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);
  return articleItems;
}
