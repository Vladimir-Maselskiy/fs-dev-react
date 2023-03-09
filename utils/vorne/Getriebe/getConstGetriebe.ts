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
    if (hanleDistance >= 225 && hanleDistance <= 350) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0102'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 350;
    } else if (hanleDistance > 350 && hanleDistance <= 600) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0202'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 600;
    } else if (hanleDistance > 600 && hanleDistance <= 700) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0302'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);

      cutGetriebeLength = hanleDistance + 700;
    } else if (hanleDistance > 700 && hanleDistance <= 850) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0402'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 850;
    } else if (hanleDistance > 850) {
      const params = {
        brand: 'vorne',
        arr: ['V.0202.0502'],
        sortSignificance: '13',
      };
      const currentArticleItems = findElementsByArticle(params);
      if (currentArticleItems) articleItems.push(...currentArticleItems);
      cutGetriebeLength = hanleDistance + 1100;
    }

    //   блок подовжувачів, при потребі

    if (height - cutGetriebeLength > 0) {
      const extension = getExtension(height - cutGetriebeLength);
      if (extension.length > 0) articleItems.push(...extension);
    }
  }
  return articleItems;
}
