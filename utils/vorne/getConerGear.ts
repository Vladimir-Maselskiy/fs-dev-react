import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';
import { getMicroVentilationPlate } from './additionalArticle/getMicroVentilationPlate';
import { getConerGearRC } from './rc/getConerGearRC';

export function getConerGear(fSet: IFSet) {
  const { microVentilation, typeOfOpening, width, isAntiBreakingOpen } = fSet;
  const articleItems: IArticleItem[] = [];

  if (isAntiBreakingOpen) {
    const conerGearRC = getConerGearRC(fSet);
    articleItems.push(...conerGearRC);
    return articleItems;
  }

  if (
    typeOfOpening === 'type-2' ||
    typeOfOpening === 'type-3' ||
    typeOfOpening === 'type-5'
  ) {
    return articleItems;
  }

  if (microVentilation) {
    const microVentilationPlate = getMicroVentilationPlate(fSet);
    if (microVentilationPlate) articleItems.push(...microVentilationPlate);
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
    arr: ['V.0601.0102'],
    sortSignificance: '12',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);

  return articleItems;
}
