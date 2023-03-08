import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getGetriebeForSchtulpPassive } from '../../Getriebe/getGetriebeForSchtulpPassive';
import { getExtensionRC } from './additionalArticle/getExtensionRC';
import { getConstGetriebeRC } from './getConstGetriebeRC';
import { getTiltGetriebeRC } from './getTiltGetriebeRC';

export const getGetriebeRC = (fSet: IFSet) => {
  const { typeOfOpening, hanleDistance, height } = fSet;
  const articleItems: IArticleItem[] = [];

  if (typeOfOpening === 'type-5') {
    const getriebeForSchtulpPassive = getGetriebeForSchtulpPassive(fSet);
    if (getriebeForSchtulpPassive) {
      articleItems.push(...getriebeForSchtulpPassive);
      return articleItems;
    }
  }
  if (typeOfOpening === 'type-3') {
    const titleGetriebeRC = getTiltGetriebeRC(fSet);
    if (titleGetriebeRC) {
      articleItems.push(...titleGetriebeRC);
      return articleItems;
    }
  }
  if (hanleDistance) {
    const constGetriebeRC = getConstGetriebeRC(fSet);
    if (constGetriebeRC) {
      articleItems.push(...constGetriebeRC);
      return articleItems;
    }
  }

  let cutGetriebeLength = null;

  if (height! >= 470 && height! < 800) {
    const params = {
      arr: ['201746', '213287', '213287'],
      sortSignificance: '3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    cutGetriebeLength = 1250;
  }

  if (height! >= 800 && height! < 1250) {
    const params = {
      arr: ['201747'],
      sortSignificance: '3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    cutGetriebeLength = 1250;
  }

  if (height! >= 1250 && height! < 1750) {
    const params = {
      arr: ['201748'],
      sortSignificance: '3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    cutGetriebeLength = 1750;
  }
  if (height! >= 1750) {
    const params = {
      arr: ['202739'],
      sortSignificance: '3',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    cutGetriebeLength = 2250;
  }
  if (cutGetriebeLength && height! - cutGetriebeLength > 0) {
    const extentions = getExtensionRC((Number(height) - cutGetriebeLength) / 2);
    if (extentions) articleItems.push(...extentions);
    getExtensionRC((Number(height) - cutGetriebeLength) / 2);
    if (extentions) articleItems.push(...extentions);
  }
  return articleItems;
};
