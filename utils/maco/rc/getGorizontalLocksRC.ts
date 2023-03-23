import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getGorizontalLocksRC(fSet: IFSet) {
  const { width, shtulpGetriebe, typeOfOpening } = fSet;
  const articleItems: IArticleItem[] = [];

  if (typeOfOpening === 'type-5' && shtulpGetriebe === 'latch') {
    return [];
  }
  if (typeOfOpening === 'type-5' && shtulpGetriebe === 'shtulpGetriebe') {
    let article = '';
    if (width! >= 350 && width! <= 750) {
      article = '222205';
    } else {
      article = '211937';
    }
    const params = {
      arr: [article],
      sortSignificance: '5',
      quantity: 2,
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }
  if (typeOfOpening === 'type-2') {
    let articleArr: string[] = [];
    if (width! >= 350 && width! <= 600) {
      articleArr = ['201750'];
    } else if (width! > 600 && width! <= 850) {
      articleArr = ['201840'];
    } else if (width! > 850 && width! <= 1100) {
      articleArr = ['201750', '201840'];
    } else if (width! > 1100) {
      articleArr = ['201840', '201840'];
    }
    const params = {
      arr: [...articleArr],
      sortSignificance: '5',
      quantity: 2,
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
    return articleItems;
  }

  if (width! >= 350 && width! <= 750) {
    const params = {
      arr: ['222205'],
      sortSignificance: '5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }
  if (width! > 750) {
    const params = {
      arr: ['211937'],
      sortSignificance: '5',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }

  return articleItems;
}
