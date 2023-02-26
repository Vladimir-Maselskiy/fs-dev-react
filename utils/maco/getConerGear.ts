import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../findElementsByArticle';
import { getMicroVentilationPlate } from './additionalArticle/getMicroVentilationPlate';

export function getConerGear(fSet: IFSet) {
  const { microVentilation, typeOfOpening } = fSet;
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
  }
  return articleItems;
}
