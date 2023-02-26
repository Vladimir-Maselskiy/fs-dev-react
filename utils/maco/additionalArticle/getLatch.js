import { addArticleToOrderList } from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';
import { getStrikePlatesForShtulp } from './getStrikePlatesForShtulp';

export function getLatch(options) {
  const { height, systemOfPVC } = options;
  addArticleToOrderList(findElementsByArticle(52504, 213922), 3.5);
  if (height > 800 && height <= 1250) {
    addArticleToOrderList(findElementsByArticle(34610), 10.1);
  }
  if (height > 1200 && height <= 1750) {
    addArticleToOrderList(findElementsByArticle(34610), 10.1);
  }
  if (height > 1750 && height <= 2250) {
    addArticleToOrderList(findElementsByArticle(34610), 10.1);
  }
  if (height > 2250) {
    addArticleToOrderList(findElementsByArticle(34610, 34610), 10.1);
  }

  getStrikePlatesForShtulp(options);
}
