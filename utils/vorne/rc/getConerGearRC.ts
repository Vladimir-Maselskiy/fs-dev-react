import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getMicroVentilationPlate } from '../additionalArticle/getMicroVentilationPlate';

export function getConerGearRC(fSet: IFSet) {
  const { typeOfOpening, width, height } = fSet;
  const articleItems: IArticleItem[] = [];

  if (
    (typeOfOpening === 'type-3' && width! >= 450) ||
    (typeOfOpening === 'type-2' && height! >= 450)
  ) {
    const params = {
      brand: 'vorne',
      arr: ['V.0608.0102', 'V.0608.0102'],
      sortSignificance: '12',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);

    return articleItems;
  }

  //   Цей конфіг не повинен прораховуватись, перестраховка
  if (
    (typeOfOpening === 'type-3' && width! < 450) ||
    (typeOfOpening === 'type-2' && height! < 450)
  ) {
    const params = {
      brand: 'vorne',
      arr: ['V.0621.0102', 'V.0621.0102'],
      sortSignificance: '12',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);

    return articleItems;
  }

  if (width && width >= 280 && width < 400) {
    const params = {
      brand: 'vorne',
      arr: ['V.0621.0102'],
      sortSignificance: '12',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  const params = {
    brand: 'vorne',
    arr: ['V.0608.0102'],
    sortSignificance: '12',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);

  return articleItems;
}
