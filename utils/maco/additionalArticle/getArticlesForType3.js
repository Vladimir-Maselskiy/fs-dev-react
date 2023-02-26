import { addArticleToOrderList } from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';
import { getTopDecor } from '../getTopDecor';
import { getTopHinge } from '../getTopHinge';

export function getArticlesForType3(options) {
  const { width, height, systemOfPVC, typeOfOpening, sideOfHinge } = options;
  if (typeOfOpening !== 'type-3') return;

  getTopDecor(options);
  getTopHinge(options);
  addArticleToOrderList(findElementsByArticle(52321, 52321), 10.5);
  if (width >= 470 && height >= 800) {
    addArticleToOrderList(findElementsByArticle(212686), 10.4);
    if (
      systemOfPVC === '13' ||
      systemOfPVC === 'Salamander' ||
      systemOfPVC === 'Rehau' ||
      systemOfPVC === 'Veka'
    ) {
      addArticleToOrderList(findElementsByArticle(33460), 8);
      return;
    }

    if (systemOfPVC === '9' && sideOfHinge === 'right') {
      addArticleToOrderList(findElementsByArticle(33322), 8);
    }
  }
}
