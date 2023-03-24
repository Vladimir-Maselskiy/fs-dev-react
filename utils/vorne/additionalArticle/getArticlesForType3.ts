import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getFullDecor } from '../getFullDecor';
import { getTopHinge } from '../getTopHinge';

export function getArticlesForType3(fSet: IFSet) {
  const articleItems: IArticleItem[] = [];

  const { width, height, systemOfPVC, typeOfOpening, isAntiBreakingOpen } =
    fSet;
  if (typeOfOpening !== 'type-3' || isAntiBreakingOpen) return articleItems;
  articleItems.push(...getFullDecor(fSet));
  articleItems.push(...getTopHinge(fSet));

  if (width! >= 450 && height! >= 800) {
    const params = {
      brand: 'vorne',
      arr: ['V.0702.0102'],
      sortSignificance: '14.2',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    if (
      systemOfPVC === '13' ||
      systemOfPVC === 'Salamander' ||
      systemOfPVC === 'Veka' ||
      systemOfPVC === 'Rehau'
    ) {
      const params = {
        brand: 'vorne',
        arr: ['V.2219.0102'],
        sortSignificance: '17.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }

    if (systemOfPVC === '9') {
      const params = {
        brand: 'vorne',
        arr: ['V.2301.0102'],
        sortSignificance: '17.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  return articleItems;
}
