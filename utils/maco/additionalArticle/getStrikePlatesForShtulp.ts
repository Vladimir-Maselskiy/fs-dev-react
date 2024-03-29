import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getStrikePlatesForShtulp(fSet: IFSet) {
  const { systemOfPVC } = fSet;
  const articleItems: IArticleItem[] = [];

  if (
    systemOfPVC === '13' ||
    systemOfPVC === 'Salamander' ||
    systemOfPVC === 'Rehau'
  ) {
    const params = {
      arr: ['26376', '26376'],
      sortSignificance: '7.9',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (systemOfPVC === 'Veka') {
    const params = {
      arr: ['26171', '26171'],
      sortSignificance: '7.9',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (systemOfPVC === '9') {
    const params = {
      arr: ['26751', '26751'],
      sortSignificance: '7.9',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  return articleItems;
}
