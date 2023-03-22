import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getExtension } from '../additionalArticle/getExtension';
import { getTurningSlantedPlateRC } from './getTurningSlantedPlateRC';

export function getGorizontalLocksRC(fSet: IFSet) {
  const { width, typeOfOpening } = fSet;
  const articleItems: IArticleItem[] = [];

  if (typeOfOpening === 'type-5' || typeOfOpening === 'type-3')
    return articleItems;

  if (typeOfOpening === 'type-2') {
    let articleArr = ['V.0608.0102', 'V.0608.0102'];
    if (width! > 600) {
      const extension = getExtension(width! - 600);
      if (extension.length > 0) articleItems.push(...extension, ...extension);
    }
    const params = {
      brand: 'vorne',
      arr: [...articleArr],
      sortSignificance: '16',
    };
    const currentArticleItems = findElementsByArticle(params);

    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  if (width! >= 350) {
    const params = {
      brand: 'vorne',
      arr: ['V.0608.0102'],
      sortSignificance: '12',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) {
      currentArticleItems[0].iS = '0';
      articleItems.push(...currentArticleItems);
    }
  }
  if (width! > 600) {
    const extension = getExtension(width! - 600);
    if (extension.length > 0) articleItems.push(...extension);
  }

  const turningSlantedPlateRC = getTurningSlantedPlateRC(fSet);
  if (turningSlantedPlateRC) articleItems.push(...turningSlantedPlateRC);

  return articleItems;
}
