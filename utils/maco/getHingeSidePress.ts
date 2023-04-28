import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';
import { getTopDecor } from './getTopDecor';
import { getTopHinge } from './getTopHinge';

export function getHingeSidePress(fSet: IFSet) {
  const { typeOfOpening, typeOfHingeSidePress } = fSet;
  const articleItems: IArticleItem[] = [];

  if (typeOfOpening === 'type-1' || typeOfOpening === 'type-4') {
    return articleItems;
  }

  if (typeOfHingeSidePress === 'hingeSidePress-type-7') {
    return articleItems;
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-1') {
    const params = {
      arr: ['54783', '41342', '41339'],
      sortSignificance: '9.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-2') {
    const params = {
      arr: ['54783', '41342', '41339', '54783', '41342', '41339'],
      sortSignificance: '9.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-3') {
    const params = {
      arr: ['94030'],
      sortSignificance: '9.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-4') {
    const params = {
      arr: ['94030', '94030'],
      sortSignificance: '9.5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-5') {
    const params = {
      arr: ['52321'],
      sortSignificance: '8.2',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (typeOfHingeSidePress === 'hingeSidePress-type-6') {
    const params = {
      arr: ['52321', '52321'],
      sortSignificance: '8.2',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }

  if (
    typeOfHingeSidePress === 'hingeSidePress-type-3' ||
    typeOfHingeSidePress === 'hingeSidePress-type-5'
  ) {
    const topDecor = getTopDecor(fSet);
    if (topDecor) articleItems.push(...topDecor);

    const topHinge = getTopHinge(fSet);
    if (topHinge) articleItems.push(...topHinge);
  }
  if (
    typeOfHingeSidePress === 'hingeSidePress-type-4' ||
    typeOfHingeSidePress === 'hingeSidePress-type-6'
  ) {
    const topDecor = getTopDecor(fSet);
    if (topDecor) articleItems.push(...topDecor, ...topDecor);

    const topHinge = getTopHinge(fSet);
    if (topHinge) articleItems.push(...topHinge, ...topHinge);
  }
  return articleItems;
}
