import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';
import { getMicroVentilationPlate } from './additionalArticle/getMicroVentilationPlate';

export function getConerGear(fSet: IFSet) {
  const { microVentilation, typeOfOpening, width } = fSet;
  const articleItems: IArticleItem[] = [];

  if (
    typeOfOpening === 'type-2' ||
    typeOfOpening === 'type-3' ||
    typeOfOpening === 'type-5'
  ) {
    return articleItems;
  }
  if (microVentilation) {
    const params = {
      arr: ['228430'],
      sortSignificance: '2',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    const microVentilationPlate = getMicroVentilationPlate(fSet);
    if (microVentilationPlate) articleItems.push(...microVentilationPlate);
    return articleItems;
  }

  if (width && width >= 220 && width < 320) {
    const params = {
      arr: ['211975'],
      sortSignificance: '2',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  const params = {
    arr: ['211974'],
    sortSignificance: '2',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);

  return articleItems;
}
