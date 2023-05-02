import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getTopDecor } from '../getTopDecor';
import { getTopHinge } from '../getTopHinge';

export function getArticlesForType3(fSet: IFSet) {
  const articleItems: IArticleItem[] = [];

  const { width, height, systemOfPVC, typeOfOpening, isAntiBreakingOpen } =
    fSet;
  if (typeOfOpening !== 'type-3' || isAntiBreakingOpen) return [];

  articleItems.push(...getTopDecor(fSet));
  articleItems.push(...getTopHinge(fSet));

  const params = {
    arr: ['52321', '52321'],
    sortSignificance: '8.2',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);

  if (width! >= 470 && height! >= 800) {
    const params = {
      arr: ['212686'],
      sortSignificance: '6.2',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    if (
      systemOfPVC === '13' ||
      systemOfPVC === 'Salamander' ||
      systemOfPVC === 'Rehau'
    ) {
      const params = {
        arr: ['33460'],
        sortSignificance: '7.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (systemOfPVC === 'Veka') {
      const params = {
        arr: ['33483'],
        sortSignificance: '7.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }

    if (systemOfPVC === '9') {
      const params = {
        arr: ['33322'],
        sortSignificance: '7.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
