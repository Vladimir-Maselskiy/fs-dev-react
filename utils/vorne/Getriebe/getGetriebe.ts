import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getExtension } from '../additionalArticle/getExtension';
import { getConstGetriebe } from './getConstGetriebe';
import { getGetriebeForSchtulpPassive } from './getGetriebeForSchtulpPassive';
import { getTiltGetriebe } from './getTiltGetriebe';
import { getTurningGetgriebe } from './getTurningGetgriebe';

export function getGetriebe(fSet: IFSet) {
  const { height, hanleDistance, typeOfOpening, isTurnTiltGetriebe } = fSet;
  const articleItems: IArticleItem[] = [];
  if (height) {
    if (typeOfOpening === 'type-5') {
      return getGetriebeForSchtulpPassive(fSet);
    }

    if (typeOfOpening === 'type-3') {
      return getTiltGetriebe(fSet);
    }

    if (typeOfOpening === 'type-2' && !isTurnTiltGetriebe) {
      return getTurningGetgriebe(fSet);
    }

    if (hanleDistance) {
      return getConstGetriebe(fSet);
    }

    let cutGetriebeLength = null;

    if (height >= 290 && height <= 450) {
      const params = {
        brand: 'vorne',
        arr: ['V.0220.0102'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }

    if (height > 450 && height <= 700) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0102'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }

    if (height > 700 && height <= 1200) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0202'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }

    if (height > 1200 && height <= 1400) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0302'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 1400 && height <= 1700) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0402'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
    }
    if (height > 1700) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0502'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = 2200;
    }
    if (cutGetriebeLength && height - cutGetriebeLength > 0) {
      const extentions = getExtension((Number(height) - cutGetriebeLength) / 2);
      if (extentions) articleItems.push(...extentions, ...extentions);
    }
  }
  return articleItems;
}
