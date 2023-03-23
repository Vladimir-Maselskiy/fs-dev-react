import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getArticlesForType5(fSet: IFSet) {
  const articleItems: IArticleItem[] = [];
  const {
    typeOfOpening,
    shtulpGetriebe,
    height,
    isAntiBreakingOpen,
    antiBreakingOpenType,
  } = fSet;
  if (typeOfOpening !== 'type-5' || shtulpGetriebe === 'shtulpGetriebe')
    return [];

  let quantityOfShtulpPlates = 0;
  if (height! > 800 && height! <= 1350) {
    quantityOfShtulpPlates = 1;
  } else if (height! <= 1750) {
    quantityOfShtulpPlates = 2;
  } else if (height! <= 2250) {
    quantityOfShtulpPlates = 3;
  } else if (height! <= 2500) {
    quantityOfShtulpPlates = 5;
  }

  if (quantityOfShtulpPlates === 0) return [];
  const article =
    isAntiBreakingOpen && antiBreakingOpenType === 'rc1' ? '96558' : '34610';
  const params = {
    arr: [article],
    sortSignificance: '7.7',
  };
  const currentArticleItems = findElementsByArticle(params);
  if (currentArticleItems) {
    currentArticleItems[0].quantity = quantityOfShtulpPlates.toString();
    articleItems.push(...currentArticleItems);
  }

  return articleItems;
}
