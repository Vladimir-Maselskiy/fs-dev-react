import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getMicroVentilationPlate } from '../additionalArticle/getMicroVentilationPlate';

export function getConerGearRC(fSet: IFSet) {
  const { microVentilation, typeOfOpening, width, height } = fSet;
  const articleItems: IArticleItem[] = [];

  if (
    (typeOfOpening === 'type-3' && width! >= 450) ||
    (typeOfOpening === 'type-2' && height! >= 450)
  ) {
    const params = {
      brand: 'vorne',
      arr: ['222201', '222201'],
      sortSignificance: '2',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);

    return articleItems;
  }

  //   Цей конфіг не повинен прораховуватись, перестраховка
  if (
    (typeOfOpening === 'type-3' && width! < 470) ||
    (typeOfOpening === 'type-2' && height! < 470)
  ) {
    const params = {
      arr: ['222201'],
      sortSignificance: '2',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);

    return articleItems;
  }

  if (microVentilation) {
    const params = {
      arr: ['209034'],
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
    arr: ['222201'],
    sortSignificance: '2',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) articleItems.push(...currentArticleItems);

  return articleItems;
}
