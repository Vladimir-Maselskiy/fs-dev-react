import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getExtensionRC } from './additionalArticle/getExtensionRC';

export function getConstGetriebeRC(fSet: IFSet) {
  const { height } = fSet;
  let { hanleDistance } = fSet;
  const articleItems: IArticleItem[] = [];
  let cutGetriebeLength = 0;

  if (height && hanleDistance) {
    hanleDistance = Math.min(hanleDistance, height - hanleDistance);
    if (hanleDistance >= 235 && hanleDistance <= 400) {
      const params = {
        arr: ['201746', '213287', '213287'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 400;
    }

    if (hanleDistance > 400 && hanleDistance <= 625) {
      const params = {
        arr: ['201747'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 625;
    }

    if (hanleDistance > 625 && hanleDistance <= 875) {
      const params = {
        arr: ['201748'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 875;
    }
    if (hanleDistance > 875) {
      const params = {
        arr: ['202739'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 1125;
    }

    //   блок подовжувачів, при потребі

    if (height - cutGetriebeLength > 0) {
      const extension = getExtensionRC(height - cutGetriebeLength);
      if (extension.length > 0) articleItems.push(...extension);
    }
  }
  return articleItems;
}
