import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';
import { getFullDecor } from './getFullDecor';
import { getTopHinge } from './getTopHinge';
// import { getTopDecor } from './getTopDecor';
// import { getTopHinge } from './getTopHinge';

export function getHingeSidePress(fSet: IFSet) {
  const { typeOfOpening, typeOfHingeSidePress, decor } = fSet;
  const articleItems: IArticleItem[] = [];

  if (
    typeOfOpening === 'type-1' ||
    typeOfOpening === 'type-4' ||
    typeOfHingeSidePress === 'hingeSidePress-type-7'
  ) {
    return articleItems;
  }

  let article: string[] = [];
  if (
    typeOfHingeSidePress === 'hingeSidePress-type-1' ||
    typeOfHingeSidePress === 'hingeSidePress-type-2'
  ) {
    if (decor === 'white') {
      article = ['V.1701.0107'];
    } else if (decor === 'brown') {
      article = ['V.1701.0108'];
    } else {
      article = ['V.1702.0002', 'V.1702.0202'];
    }
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-1') {
    const params = {
      brand: 'vorne',
      arr: [...article],
      sortSignificance: '19.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-2') {
    const params = {
      brand: 'vorne',
      arr: [...article],
      quantity: 2,
      sortSignificance: '19.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-3') {
    const params = {
      brand: 'vorne',
      arr: ['V.1601.0102'],
      sortSignificance: '19.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-4') {
    const params = {
      brand: 'vorne',
      arr: ['V.1601.0102'],
      quantity: 2,
      sortSignificance: '19.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-5') {
    const params = {
      brand: 'vorne',
      arr: ['V.1603.0102'],
      sortSignificance: '19.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-6') {
    const params = {
      brand: 'vorne',
      arr: ['V.1603.0102'],
      quantity: 2,
      sortSignificance: '19.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  const fullDecor = getFullDecor(fSet);
  const topHinge = getTopHinge(fSet);
  if (
    typeOfHingeSidePress === 'hingeSidePress-type-3' ||
    typeOfHingeSidePress === 'hingeSidePress-type-5'
  ) {
    if (fullDecor) articleItems.push(...fullDecor);
    if (topHinge) articleItems.push(...topHinge);
  }
  if (
    typeOfHingeSidePress === 'hingeSidePress-type-4' ||
    typeOfHingeSidePress === 'hingeSidePress-type-6'
  ) {
    if (fullDecor) articleItems.push(...fullDecor, ...fullDecor);
    if (topHinge) articleItems.push(...topHinge, ...topHinge);
  }
  return articleItems;
}
