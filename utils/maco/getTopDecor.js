import { addArticleToOrderList } from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';

export function getTopDecor(options) {
  addArticleToOrderList(findElementsByArticle(42083, 42084), 13);
}
