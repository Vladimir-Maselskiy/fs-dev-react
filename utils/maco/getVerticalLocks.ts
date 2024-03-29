import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';
import { getVerticalLocksRC } from './rc/getVerticalLocksRC';

export function getVerticalLocks(fSet: IFSet) {
  const {
    width,
    height,
    typeOfOpening,
    isAntiBreakingOpen,
    antiBreakingOpenType,
    optionalVerticalLock,
  } = fSet;
  const articleItems: IArticleItem[] = [];
  if (height) {
    if (
      optionalVerticalLock &&
      (typeOfOpening === 'type-1' || typeOfOpening === 'type-4')
    ) {
      const params = {
        arr: optionalVerticalLock,
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (isAntiBreakingOpen && antiBreakingOpenType === 'rc1') {
      articleItems.push(...getVerticalLocksRC(fSet));
      return articleItems;
    }
    if (typeOfOpening === 'type-5' || typeOfOpening === 'type-2') {
      return [];
    }

    if (typeOfOpening === 'type-3' && height >= 800 && width! >= 470) {
      let article = '';
      if (height <= 1280) {
        article = '211924';
      } else if (height <= 1500) {
        article = '211925';
      } else if (height <= 2000) {
        article = '211926';
      } else if (height <= 2200) {
        article = '211927';
      } else {
        article = '211928';
      }
      const params = {
        arr: [article, article],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }

    if (height > 480 && height < 800) {
      const params = {
        arr: ['228398'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 800 && height < 1280) {
      const params = {
        arr: ['211924'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 1280 && height < 1500) {
      const params = {
        arr: ['211925'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 1500 && height < 2000) {
      const params = {
        arr: ['211926'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 2000 && height < 2200) {
      const params = {
        arr: ['211927'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 2200) {
      const params = {
        arr: ['211928'],
        sortSignificance: '5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
