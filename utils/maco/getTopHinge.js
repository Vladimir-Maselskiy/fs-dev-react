import { addArticleToOrderList } from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';

export function getTopHinge(options) {
  const { systemOfPVC } = options;
  addArticleToOrderList(findElementsByArticle(52480, 94491), 11);

  if (
    systemOfPVC === '13' ||
    systemOfPVC === 'Salamander' ||
    systemOfPVC === 'Rehau' ||
    systemOfPVC === 'Veka'
  ) {
    addArticleToOrderList(findElementsByArticle(52486), 11);
  }

  if (systemOfPVC === '9') {
    addArticleToOrderList(findElementsByArticle(52487), 11);
  }
}
