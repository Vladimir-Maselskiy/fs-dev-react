import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getGorizontalLocks(fSet: IFSet) {
  const {
    width,
    shtulpGetriebe,
    isGorizontalLock,
    typeOfOpening,
    isTurnTiltGetriebe,
  } = fSet;
  const articleItems: IArticleItem[] = [];

  if (
    (typeOfOpening === 'type-5' && shtulpGetriebe === 'latch') ||
    !isGorizontalLock
  ) {
    return [];
  }
  if (
    typeOfOpening === 'type-5' &&
    shtulpGetriebe === 'shtulpGetriebe' &&
    isGorizontalLock
  ) {
    let article = '';
    if (width! <= 800) {
      article = '228398';
    } else if (width! <= 1280) {
      article = '211924';
    } else article = '211925';
    const params = {
      arr: [article, article],
      sortSignificance: '6',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  if (isGorizontalLock && width) {
    if (width < 800) {
      const params = {
        arr: ['228398'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      if (typeOfOpening === 'type-2' && isTurnTiltGetriebe) {
        const params = {
          arr: ['228398'],
          sortSignificance: '6',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
    }
    if (width >= 800) {
      const params = {
        arr: ['211924'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      if (typeOfOpening === 'type-2' && isTurnTiltGetriebe) {
        const params = {
          arr: ['211924'],
          sortSignificance: '6',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
    }
  }

  return articleItems;
}
