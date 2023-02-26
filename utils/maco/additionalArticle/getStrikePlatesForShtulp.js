import { addArticleToOrderList } from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';

export function getStrikePlatesForShtulp(options) {
  const { systemOfPVC } = options;
  if (
    systemOfPVC === '13' ||
    systemOfPVC === 'Salamander' ||
    systemOfPVC === 'Rehau' ||
    systemOfPVC === 'Veka'
  ) {
    addArticleToOrderList(findElementsByArticle(26376, 26376), 10.2);
    return;
  }
  if (systemOfPVC === '9') {
    addArticleToOrderList(findElementsByArticle(26751, 26751), 10.2);
    return;
  }
}
