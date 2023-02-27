import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../findElementsByArticle';

export function getTurningSlantedPlate(fSet: IFSet) {
  const {
    systemOfPVC,
    sideOfHinge,
    typeOfOpening = 'type-1',
    isTurnTiltGetriebe = false,
  } = fSet;
  const articleItems: IArticleItem[] = [];

  if (typeOfOpening === 'type-2' && !isTurnTiltGetriebe) {
    return articleItems;
  }
  if (
    typeOfOpening === 'type-3' ||
    typeOfOpening === 'type-4' ||
    typeOfOpening === 'type-5'
  ) {
    return articleItems;
  }
  if (
    (systemOfPVC === '13' ||
      systemOfPVC === 'Salamander' ||
      systemOfPVC === 'Rehau') &&
    sideOfHinge === 'right'
  ) {
    const params = {
      arr: ['33460'],
      sortSignificance: '8',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (systemOfPVC === 'Veka' && sideOfHinge === 'right') {
    const params = {
      arr: ['33483'],
      sortSignificance: '8',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (
    (systemOfPVC === '13' ||
      systemOfPVC === 'Salamander' ||
      systemOfPVC === 'Rehau') &&
    sideOfHinge === 'left'
  ) {
    const params = {
      arr: ['33461'],
      sortSignificance: '8',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (systemOfPVC === 'Veka' && sideOfHinge === 'left') {
    const params = {
      arr: ['33484'],
      sortSignificance: '8',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (systemOfPVC === '9' && sideOfHinge === 'right') {
    const params = {
      arr: ['33322'],
      sortSignificance: '8',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (systemOfPVC === '9' && sideOfHinge === 'left') {
    const params = {
      arr: ['33323'],
      sortSignificance: '8',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  return articleItems;
}
