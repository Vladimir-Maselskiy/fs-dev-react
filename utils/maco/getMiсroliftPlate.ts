import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getMicroliftPlate(fSet: IFSet) {
  const {
    height,
    systemOfPVC,
    sideOfHinge,
    typeOfOpening,
    isTurnTiltGetriebe,
    shtulpGetriebe,
  } = fSet;
  const articleItems: IArticleItem[] = [];

  if (height) {
    if ((typeOfOpening === 'type-2' && !isTurnTiltGetriebe) || height < 800) {
      return articleItems;
    }
    if (
      (typeOfOpening === 'type-3' && height < 800) ||
      typeOfOpening === 'type-4'
    ) {
      return articleItems;
    }
    if (shtulpGetriebe === 'shtulpGetriebe' && typeOfOpening === 'type-5') {
      return articleItems;
    }

    if (shtulpGetriebe === 'latch' && typeOfOpening === 'type-5') {
      if (sideOfHinge === 'right') {
        const params = {
          arr: ['355924'],
          sortSignificance: '9',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
        return articleItems;
      }
      if (sideOfHinge === 'left') {
        const params = {
          arr: ['355923'],
          sortSignificance: '9',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
        return articleItems;
      }
    }

    if (
      (systemOfPVC === '13' ||
        systemOfPVC === 'Salamander' ||
        systemOfPVC === 'Rehau' ||
        systemOfPVC === 'Veka') &&
      sideOfHinge === 'right'
    ) {
      const params = {
        arr: ['356966'],
        sortSignificance: '9',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (
      (systemOfPVC === '13' ||
        systemOfPVC === 'Salamander' ||
        systemOfPVC === 'Rehau' ||
        systemOfPVC === 'Veka') &&
      sideOfHinge === 'left'
    ) {
      const params = {
        arr: ['356967'],
        sortSignificance: '9',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (systemOfPVC === '9' && sideOfHinge === 'right') {
      const params = {
        arr: ['358680'],
        sortSignificance: '9',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (systemOfPVC === '9' && sideOfHinge === 'left') {
      const params = {
        arr: ['358681'],
        sortSignificance: '9',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
  }
  return articleItems;
}
