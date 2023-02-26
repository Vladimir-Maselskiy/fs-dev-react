import { addArticleToOrderList } from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';

export function getTurningGetgriebe(option) {
  const { height } = option;
  if (height >= 300 && height <= 500) {
    addArticleToOrderList(findElementsByArticle(211989), 3);
  }
  if (height > 500 && height <= 700) {
    addArticleToOrderList(findElementsByArticle(211990), 3);
  }
  if (height > 700 && height <= 1000) {
    addArticleToOrderList(findElementsByArticle(211991), 3);
  }
  if (height > 1000 && height <= 1400) {
    addArticleToOrderList(findElementsByArticle(211992), 3);
  }
  if (height > 1400 && height <= 1800) {
    addArticleToOrderList(findElementsByArticle(211993), 3);
  }
  if (height > 1800) {
    addArticleToOrderList(findElementsByArticle(211994), 3);
  }
}
