import { addArticleToOrderList } from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';

export function getBottomDecor(options) {
  const { withoutBottomHinge = false } = options;
  if (withoutBottomHinge) return;
  if (options.typeOfOpening === 'type-3') {
    return;
  }

  addArticleToOrderList(findElementsByArticle(42087, 41742, 41743), 14);
}
