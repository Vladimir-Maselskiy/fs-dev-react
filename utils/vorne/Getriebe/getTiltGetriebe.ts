import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getTiltGetriebe(fSet: IFSet) {
  const { height, width } = fSet;
  const articleItems: IArticleItem[] = [];

  if (width && height) {
    if (width >= 300 && width < 450) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0102M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    } else if (width > 400 && width < 450) {
      const params = {
        brand: 'vorne',
        arr: ['V.0103.0202M'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    } else if (height < 800) {
      if (width > 450 && width <= 600) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.0202M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      } else if (width > 600 && width <= 800) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.0302M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      } else if (width > 800 && width <= 1000) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.0402M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      } else if (width > 1000 && width <= 1200) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.0502M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      } else if (width > 1200 && width <= 1400) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.0602M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      } else if (width > 1400 && width <= 1600) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.0702M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      } else if (width > 1600 && width <= 1800) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.0902M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      } else if (width > 1800 && width <= 2000) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.1102M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      } else if (width > 2000) {
        const params = {
          brand: 'vorne',
          arr: ['V.0103.1202M'],
          sortSignificance: '13',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }

      return articleItems;
    }
    if (width >= 450 && width <= 700) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0102'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (width > 700 && width <= 900) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0202'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (width > 900 && width <= 1400) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0302'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (width > 1400 && width <= 1700) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0402'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    } else if (width > 1700) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0502'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
