import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getVerticalLocksRC(fSet: IFSet) {
  const { width, height, typeOfOpening } = fSet;
  const articleItems: IArticleItem[] = [];

  if (typeOfOpening === 'type-5' || typeOfOpening === 'type-2') {
    return [];
  }

  if (typeOfOpening === 'type-3' && width! >= 470) {
    let articleArr: string[] = [];
    if (height! >= 350 && height! <= 600) {
      articleArr = ['201750'];
    } else if (height! > 600 && height! <= 850) {
      articleArr = ['201840'];
    } else if (height! > 850 && height! <= 1100) {
      articleArr = ['201750', '201840'];
    } else if (height! > 1100) {
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

  articleItems.push(
    ...findElementsByArticle({
      arr: ['222215'],
      sortSignificance: '2',
    })!
  );

  let articleArr: string[] = [];

  if (height! >= 350 && height! <= 600) {
    articleArr = ['201750'];
  } else if (height! > 600 && height! <= 1250) {
    articleArr = ['201840'];
  } else if (height! > 1250 && height! <= 1720) {
    articleArr = ['201840', '201840'];
  } else if (height! > 1720 && height! <= 2190) {
    articleArr = ['201840', '201840', '201840'];
  } else {
    articleArr = ['201840', '201840', '201840', '201840'];
  }

  articleItems.push(
    ...findElementsByArticle({
      arr: [...articleArr],
      sortSignificance: '5',
    })!
  );

  return articleItems;
}
