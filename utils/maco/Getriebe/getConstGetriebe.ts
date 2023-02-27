import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';
import { getExtension } from '../additionalArticle/getExtension';

export function getConstGetriebe(fSet: IFSet) {
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
        arr: ['212156'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 625;
    }
    if (hanleDistance > 625 && hanleDistance <= 675) {
      const params = {
        arr: ['225098'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);

      cutGetriebeLength = hanleDistance + 675;
    }
    if (hanleDistance > 625 && hanleDistance <= 875) {
      const params = {
        arr: ['212158'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 875;
    }
    if (hanleDistance > 875) {
      const params = {
        arr: ['212160'],
        sortSignificance: '3',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 1125;
    }

    //   блок подовжувачів, при потребі

    if (height - cutGetriebeLength > 0) {
      const extension = getExtension(height - cutGetriebeLength);
      if (extension.length > 0) articleItems.push(...extension);
    }
  }
  return articleItems;
}
