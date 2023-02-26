import { addArticleToOrderList } from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';

export function getBottomHinge(options) {
  const { withoutBottomHinge = false } = options;
  if (withoutBottomHinge) return;
  if (options.typeOfOpening === 'type-3') {
    return;
  }
  addArticleToOrderList(findElementsByArticle(52478, 52483), 12);
}
