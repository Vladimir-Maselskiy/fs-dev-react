import { IArticleItem, IFSet } from '@/interfaces/interfaces';

import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getStrikeplates(currentSet: IArticleItem[], fSet: IFSet) {
  const { systemOfPVC } = fSet;
  const articleItems: IArticleItem[] = [];

  const quantityOfPlatesVZ = getQuantityOfPlatesVZ(currentSet);
  const quantityOfPlatesRC = getQuantityOfPlatesRC(currentSet);

  if (systemOfPVC === '13' || systemOfPVC === 'Salamander') {
    const paramsVZ = {
      arr: ['34824'],
      sortSignificance: '10',
      quantity: quantityOfPlatesVZ,
    };
    const paramsRC = {
      arr: ['96140'],
      sortSignificance: '10',
      quantity: quantityOfPlatesRC,
    };
    const currentArticleItemsVZ = findElementsByArticle(paramsVZ);
    const currentArticleItemsRC = findElementsByArticle(paramsRC);
    articleItems.push(...currentArticleItemsVZ!, ...currentArticleItemsRC!);
  }
  if (systemOfPVC === 'Rehau') {
    const paramsVZ = {
      arr: ['354970'],
      sortSignificance: '10',
      quantity: quantityOfPlatesVZ,
    };
    const paramsRC = {
      arr: ['96140'],
      sortSignificance: '10',
      quantity: quantityOfPlatesRC,
    };
    const currentArticleItemsVZ = findElementsByArticle(paramsVZ);
    const currentArticleItemsRC = findElementsByArticle(paramsRC);
    articleItems.push(...currentArticleItemsVZ!, ...currentArticleItemsRC!);
  }
  if (systemOfPVC === 'Veka') {
    const paramsVZ = {
      arr: ['34283'],
      sortSignificance: '10',
      quantity: quantityOfPlatesVZ,
    };
    const paramsRC = {
      arr: ['96429'],
      sortSignificance: '10',
      quantity: quantityOfPlatesRC,
    };
    const currentArticleItemsVZ = findElementsByArticle(paramsVZ);
    const currentArticleItemsRC = findElementsByArticle(paramsRC);
    articleItems.push(...currentArticleItemsVZ!, ...currentArticleItemsRC!);
  }
  if (systemOfPVC === '9') {
    const paramsVZ = {
      arr: ['34850'],
      sortSignificance: '10',
      quantity: quantityOfPlatesVZ,
    };
    const paramsRC = {
      arr: ['96482'],
      sortSignificance: '10',
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
