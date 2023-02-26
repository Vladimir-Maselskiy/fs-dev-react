import { addArticleToOrderList } from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';

export function getTiltGetriebe(options) {
  const { height, width, hingeSidePress } = options;
  if (width >= 300 && width < 470) {
    addArticleToOrderList(findElementsByArticle(211989), 3);
    return;
  }
  if (height < 800) {
    if (width >= 470 && width <= 500) {
      addArticleToOrderList(findElementsByArticle(211989), 3);
    }
    if (width > 500 && width <= 700) {
      addArticleToOrderList(findElementsByArticle(211990), 3);
    }
    if (width > 700 && width <= 1000) {
      addArticleToOrderList(findElementsByArticle(211991), 3);
    }
    if (width > 1000 && width <= 1400) {
      addArticleToOrderList(findElementsByArticle(211992), 3);
    }
    if (width > 1400 && width <= 1800) {
      addArticleToOrderList(findElementsByArticle(211993), 3);
    }
    if (width > 1800) {
      addArticleToOrderList(findElementsByArticle(211994), 3);
    }
    return;
  }
  if (width >= 470 && width <= 800) {
    addArticleToOrderList(findElementsByArticle(201746, 213287, 213287), 3);
  }
  if (width > 800 && width <= 1250) {
    addArticleToOrderList(findElementsByArticle(212156), 3);
  }
  if (width > 1250 && width <= 1750) {
    addArticleToOrderList(findElementsByArticle(212158), 3);
  }
  if (width > 1750) {
    addArticleToOrderList(findElementsByArticle(212160), 3);
  }
}
