import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/findElementsByArticle';

export function getTiltGetriebe(fSet: IFSet) {
  const { height, width, typeOfHingeSidePress } = fSet;
  const articleItems: IArticleItem[] = [];

  if (width && height) {
    if (width >= 300 && width < 470) {
      const params = {
        arr: ['211989'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      return articleItems;
    }
    if (height < 800) {
      if (width >= 470 && width <= 500) {
        const params = {
          arr: ['211989'],
          sortSignificance: '3',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
      if (width > 500 && width <= 700) {
        const params = {
          arr: ['211990'],
          sortSignificance: '3',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
      if (width > 700 && width <= 1000) {
        const params = {
          arr: ['211991'],
          sortSignificance: '3',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
      if (width > 1000 && width <= 1400) {
        const params = {
          arr: ['211992'],
          sortSignificance: '3',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
      if (width > 1400 && width <= 1800) {
        const params = {
          arr: ['211993'],
          sortSignificance: '3',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
      if (width > 1800) {
        const params = {
          arr: ['211994'],
          sortSignificance: '3',
        };
        const currentArticleItems = findElementsByArticle(params);
        if (currentArticleItems) articleItems.push(...currentArticleItems);
      }
      return articleItems;
    }
    if (width >= 470 && width <= 800) {
      const params = {
        arr: ['201746', '213287', '213287'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width > 800 && width <= 1250) {
      const params = {
        arr: ['212156'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width > 1250 && width <= 1750) {
      const params = {
        arr: ['212158'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (width > 1750) {
      const params = {
        arr: ['212160'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
