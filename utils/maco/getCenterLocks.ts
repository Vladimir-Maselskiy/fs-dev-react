import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getCenterLocks(fSet: IFSet) {
  const {
    width,
    height,
    shtulpGetriebe,
    isGorizontalLock,
    typeOfOpening,
    isTurnTiltGetriebe,
  } = fSet;
  const articleItems: IArticleItem[] = [];
  if (width && height) {
    if (typeOfOpening === 'type-5' && shtulpGetriebe === 'latch') {
      return articleItems;
    }
    if (
      typeOfOpening === 'type-5' &&
      shtulpGetriebe === 'shtulpGetriebe' &&
      isGorizontalLock
    ) {
      let article = '';
      if (width <= 800) {
        article = '228398';
      } else if (width <= 1280) {
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
    if (typeOfOpening === 'type-5') {
      return [];
    }

    if (typeOfOpening === 'type-3' && height >= 800 && width >= 470) {
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

    if (typeOfOpening === 'type-2' || typeOfOpening === 'type-3') {
      return articleItems;
    }

    if (height > 480 && height < 800) {
      const params = {
        arr: ['228398'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 800 && height < 1280) {
      const params = {
        arr: ['211924'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 1280 && height < 1500) {
      const params = {
        arr: ['211925'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 1500 && height < 2000) {
      const params = {
        arr: ['211926'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 2000 && height < 2200) {
      const params = {
        arr: ['211927'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 2200 && height < 2450) {
      const params = {
        arr: ['211928'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
