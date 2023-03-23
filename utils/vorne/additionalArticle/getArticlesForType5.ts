import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getArticlesForType5(fSet: IFSet) {
  const articleItems: IArticleItem[] = [];
  const { typeOfOpening, height } = fSet;
  if (typeOfOpening !== 'type-5') return articleItems;

  let quantityOfShtulpPlates = 0;
  if (height! >= 700 && height! <= 1400) {
    quantityOfShtulpPlates = 1;
  } else if (height! <= 2200) {
    quantityOfShtulpPlates = 2;
  } else quantityOfShtulpPlates = 4;

  if (quantityOfShtulpPlates === 0) return [];

  const params = {
    brand: 'vorne',
    arr: ['V.2404.0102'],
    sortSignificance: '17.5',
    quantity: quantityOfShtulpPlates,
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) {
    articleItems.push(...currentArticleItems);
  }

  return articleItems;
}
