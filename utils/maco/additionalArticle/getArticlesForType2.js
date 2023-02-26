import { addArticleToOrderList } from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';

export function getArticlesForType2(options) {
  const { isTurnTiltGetriebe, typeOfOpening } = options;
  if (typeOfOpening !== 'type-2') return;
  if (isTurnTiltGetriebe) {
    addArticleToOrderList(findElementsByArticle(212686), 10.4);
  }
}
