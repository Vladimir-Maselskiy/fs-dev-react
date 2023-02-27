import { IArticleItem, IFSet, TTypeOfOpenimg } from '@/interfaces/interfaces';

import { findElementsByArticle } from '../findElementsByArticle';

export function getStrikeplates(currentSet: IArticleItem[], fSet: IFSet) {
  const { systemOfPVC } = fSet;
  const articleItems: IArticleItem[] = [];

  const quantityOfPlatesVZ = getQuantityOfPlatesVZ(currentSet);

  if (systemOfPVC === '13' || systemOfPVC === 'Salamander') {
    const params = {
      arr: ['34824'],
      sortSignificance: '10',
      quantity: quantityOfPlatesVZ,
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (systemOfPVC === 'Rehau') {
    const params = {
      arr: ['354970'],
      sortSignificance: '10',
      quantity: quantityOfPlatesVZ,
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (systemOfPVC === 'Veka') {
    const params = {
      arr: ['34283'],
      sortSignificance: '10',
      quantity: quantityOfPlatesVZ,
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (systemOfPVC === '9') {
    const params = {
      arr: ['34850'],
      sortSignificance: '10',
      quantity: quantityOfPlatesVZ,
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
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
