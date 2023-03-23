import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';
import { getGorizontalLocksRC } from './rc/getGorizontalLocksRC';

export function getGorizontalLocks(fSet: IFSet) {
  const {
    width,
    shtulpGetriebe,
    isGorizontalLock,
    typeOfOpening,
    isTurnTiltGetriebe,
    isAntiBreakingOpen,
  } = fSet;
  const articleItems: IArticleItem[] = [];

  if (isAntiBreakingOpen) {
    articleItems.push(...getGorizontalLocksRC(fSet));
    return articleItems;
  }
  if (
    (typeOfOpening === 'type-5' && shtulpGetriebe === 'latch') ||
    !isGorizontalLock
  )
    return articleItems;

  if (isGorizontalLock && width) {
    if (width < 800) {
      const params = {
        brand: 'vorne',
        arr: ['V.0801.0202'],
        sortSignificance: '15',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);

      if (typeOfOpening === 'type-2' && isTurnTiltGetriebe) {
        const params = {
          brand: 'vorne',
          arr: ['V.0801.0202'],
          sortSignificance: '15',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
    }
    if (width >= 800) {
      const params = {
        brand: 'vorne',
        arr: ['V.0801.0302'],
        sortSignificance: '15',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      if (typeOfOpening === 'type-2' && isTurnTiltGetriebe) {
        const params = {
          abrand: 'vorne',
          arr: ['V.0801.0302'],
          sortSignificance: '15',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
    }
  }

  return articleItems;
}
