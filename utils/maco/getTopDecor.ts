import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getTopDecor(fSet: IFSet) {
  const articleItems: IArticleItem[] = [];
  const { decor } = fSet;

  if (decor === 'white') {
    const params = {
      arr: ['42083', '42084'],
      sortSignificance: '9.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'brown') {
    const params = {
      arr: ['42189', '42192'],
      sortSignificance: '9.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'anthracite') {
    const params = {
      arr: ['370097', '370098'],
      sortSignificance: '9.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'black') {
    const params = {
      arr: ['42193', '42190'],
      sortSignificance: '9.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'bronze') {
    const params = {
      arr: ['42097', '42105'],
      sortSignificance: '9.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'silver') {
    const params = {
      arr: ['43761', '43760'],
      sortSignificance: '9.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'titan') {
    const params = {
      arr: ['42099', '42107'],
      sortSignificance: '9.3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  return articleItems;
}
