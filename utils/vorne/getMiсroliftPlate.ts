import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getMicroliftPlate(fSet: IFSet) {
  const { height, systemOfPVC, typeOfOpening, isTurnTiltGetriebe } = fSet;
  const articleItems: IArticleItem[] = [];

  if (height) {
    if (
      height < 800 ||
      (typeOfOpening === 'type-2' && !isTurnTiltGetriebe) ||
      typeOfOpening === 'type-3' ||
      typeOfOpening === 'type-4'
    ) {
      return articleItems;
    }

    const params = {
      brand: 'vorne',
      arr: ['V.4801.0102'],
      sortSignificance: '17.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);

    if (typeOfOpening === 'type-5') {
      const params = {
        brand: 'vorne',
        arr: ['V.2806.0102'],
        sortSignificance: '19.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);

      return articleItems;
    }
    if (systemOfPVC === '9') {
      const params = {
        brand: 'vorne',
        arr: ['V.2801.0102'],
        sortSignificance: '19.1',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);

      return articleItems;
    }
  }

  const params = {
    brand: 'vorne',
    arr: ['V.2701.0102'],
    sortSignificance: '19.1',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);

  return articleItems;
}
