import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getExtension } from '../additionalArticle/getExtension';
import { getGetriebeRC } from '../rc/getriebeRC/getGetriebeRC';
import { getConstGetriebe } from './getConstGetriebe';
import { getGetriebeForSchtulpPassive } from './getGetriebeForSchtulpPassive';
import { getTiltGetriebe } from './getTiltGetriebe';
import { getTurningGetgriebe } from './getTurningGetgriebe';

export function getGetriebe(fSet: IFSet) {
  const {
    height,
    hanleDistance,
    typeOfOpening,
    isTurnTiltGetriebe,
    isAntiBreakingOpen,
    antiBreakingOpenType,
  } = fSet;
  const articleItems: IArticleItem[] = [];
  if (height) {
    if (isAntiBreakingOpen && antiBreakingOpenType === 'rc1') {
      const getriebeRC = getGetriebeRC(fSet);
      if (getriebeRC) {
        articleItems.push(...getriebeRC);
        return articleItems;
      }
    }

    if (typeOfOpening === 'type-5') {
      const getriebeForSchtulpPassive = getGetriebeForSchtulpPassive(fSet);
      if (getriebeForSchtulpPassive) {
        articleItems.push(...getriebeForSchtulpPassive);
        return articleItems;
      }
    }
    if (typeOfOpening === 'type-3') {
      const titleGetriebe = getTiltGetriebe(fSet);
      if (titleGetriebe) {
        articleItems.push(...titleGetriebe);
        return articleItems;
      }
    }
    if (typeOfOpening === 'type-2' && !isTurnTiltGetriebe) {
      return getTurningGetgriebe(fSet);
    }
    if (hanleDistance) {
      return getConstGetriebe(fSet);
    }

    let cutGetriebeLength = null;

    if (height >= 470 && height < 800) {
      const params = {
        arr: ['201746', '213287', '213287'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = 1250;
    }

    if (height >= 800 && height < 1250) {
      const params = {
        arr: ['212156'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = 1250;
    }

    if (height >= 1250 && height < 1350) {
      const params = {
        arr: ['225098'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = 1350;
    }

    if (height >= 1350 && height < 1750) {
      const params = {
        arr: ['212158'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = 1750;
    }
    if (height >= 1750) {
      const params = {
        arr: ['212160'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = 2250;
    }
    if (cutGetriebeLength && height - cutGetriebeLength > 0) {
      const extentions = getExtension((Number(height) - cutGetriebeLength) / 2);
      if (extentions) articleItems.push(...extentions);
      getExtension((Number(height) - cutGetriebeLength) / 2);
      if (extentions) articleItems.push(...extentions);
    }
  }
  return articleItems;
}
