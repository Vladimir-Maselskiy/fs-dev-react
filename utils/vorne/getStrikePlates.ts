import { IArticleItem, IFSet } from '@/interfaces/interfaces';

import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getStrikeplates(currentSet: IArticleItem[], fSet: IFSet) {
  const { systemOfPVC } = fSet;
  const articleItems: IArticleItem[] = [];

  const quantityOfPlatesVZ = getQuantityOfPlatesVZ(currentSet);
  const quantityOfPlatesRC = getQuantityOfPlatesRC(currentSet);

  if (
    systemOfPVC === '13' ||
    systemOfPVC === 'Salamander' ||
    systemOfPVC === 'Rehau'
  ) {
    const paramsVZ = {
      brand: 'vorne',
      arr: ['V.2516.0102'],
      sortSignificance: '17.5',
      quantity: quantityOfPlatesVZ,
    };
    const paramsRC = {
      brand: 'vorne',
      arr: ['V.3402.0102'],
      sortSignificance: '17.5',
      quantity: quantityOfPlatesRC,
    };
    const currentArticleItemsVZ = findElementsByArticle(paramsVZ);
    const currentArticleItemsRC = findElementsByArticle(paramsRC);
    articleItems.push(...currentArticleItemsVZ!, ...currentArticleItemsRC!);
  }

  if (systemOfPVC === 'Veka') {
    const paramsVZ = {
      brand: 'vorne',
      arr: ['V.2507.0102'],
      sortSignificance: '17.5',
      quantity: quantityOfPlatesVZ,
    };
    const paramsRC = {
      brand: 'vorne',
      arr: ['V.3402.0102'],
      sortSignificance: '17.7',
      quantity: quantityOfPlatesRC,
    };
    const currentArticleItemsVZ = findElementsByArticle(paramsVZ);
    const currentArticleItemsRC = findElementsByArticle(paramsRC);
    articleItems.push(...currentArticleItemsVZ!, ...currentArticleItemsRC!);
  }
  if (systemOfPVC === '9') {
    const paramsVZ = {
      brand: 'vorne',
      arr: ['V.2601.0102'],
      sortSignificance: '17.5',
      quantity: quantityOfPlatesVZ,
    };
    const paramsRC = {
      brand: 'vorne',
      arr: ['V.3501.0102'],
      sortSignificance: '17.7',
      quantity: quantityOfPlatesRC,
    };
    const currentArticleItemsVZ = findElementsByArticle(paramsVZ);
    const currentArticleItemsRC = findElementsByArticle(paramsRC);
    articleItems.push(...currentArticleItemsVZ!, ...currentArticleItemsRC!);
  }
  return articleItems;
}

function getQuantityOfPlatesVZ(currentSet: IArticleItem[]) {
  let quantityVZ = 0;
  currentSet.forEach(element => {
    if (element.VZ) quantityVZ += +element.VZ;
  });
  return quantityVZ;
}
function getQuantityOfPlatesRC(currentSet: IArticleItem[]) {
  let quantityRC = 0;
  currentSet.forEach(element => {
    if (element.iS) quantityRC += +element.iS;
  });
  return quantityRC;
}
