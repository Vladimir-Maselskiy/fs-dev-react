import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getLatch } from '../additionalArticle/getLatch';
import { getStrikePlatesForShtulp } from '../additionalArticle/getStrikePlatesForShtulp';

export function getGetriebeForSchtulpPassive(fSet: IFSet) {
  const { height, shtulpGetriebe } = fSet;
  const articleItems: IArticleItem[] = [];

  if (shtulpGetriebe === 'latch') {
    const latch = getLatch(fSet);
    if (latch) articleItems.push(...latch);
  }
  if (shtulpGetriebe === 'shtulpGetriebe' && height) {
    const params = {
      arr: ['211745'],
      sortSignificance: '3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);

    if (height >= 930 && height <= 1250) {
      const params = {
        arr: ['211791'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }

    if (height > 1250 && height <= 1750) {
      const params = {
        arr: ['209670'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }

    if (height > 1750 && height <= 2250) {
      const params = {
        arr: ['209671'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height >= 930 && height <= 1250) {
      const params = {
        arr: ['209671'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 1250) {
      const params = {
        arr: ['209637'],
        sortSignificance: '3.5',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 2250) {
      const params = {
        arr: ['206630, 206630'],
        sortSignificance: '6',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
  }
  const stikePlates = getStrikePlatesForShtulp(fSet);
  if (stikePlates) articleItems.push(...stikePlates);
  return articleItems;
}
