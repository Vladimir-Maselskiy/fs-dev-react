import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '../data-utils/findElementsByArticle';

export function getBottomDecor(fSet: IFSet) {
  const articleItems: IArticleItem[] = [];
  const { decor, isWithoutBottomHinge, typeOfOpening } = fSet;

  if (isWithoutBottomHinge || typeOfOpening === 'type-3') return articleItems;

  if (decor === 'white') {
    const params = {
      arr: ['42087', '41742', '41743'],
      sortSignificance: '9.7',
    };
    const currentArticleItems = findElementsByArticle(params);
    let modifySortSignificance;
    if (currentArticleItems) {
      modifySortSignificance = currentArticleItems.map(item => {
        if (item.article === '42087')
          return { ...item, sortSignificance: '9.6' };
        return item;
      });
    }
    if (modifySortSignificance) articleItems.push(...modifySortSignificance);
    return articleItems;
  }
  if (decor === 'brown') {
    const params = {
      arr: ['42186', '42195', '42208'],
      sortSignificance: '9.7',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'anthracite') {
    const params = {
      arr: ['370099', '370100', '370101'],
      sortSignificance: '9.7',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'black') {
    const params = {
      arr: ['42187', '42196', '42209'],
      sortSignificance: '9.7',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'bronze') {
    const params = {
      arr: ['42093', '41762', '41752'],
      sortSignificance: '9.7',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'silver') {
    const params = {
      arr: ['43940', '43566', '43567'],
      sortSignificance: '9.7',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (decor === 'titan') {
    const params = {
      arr: ['42095', '42048', '42057'],
      sortSignificance: '9.7',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  return articleItems;
}
