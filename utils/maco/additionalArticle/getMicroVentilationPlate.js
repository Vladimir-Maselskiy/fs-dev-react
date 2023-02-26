import { addArticleToOrderList } from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';

export function getMicroVentilationPlate(options) {
  const { systemOfPVC, typeOfOpening } = options;
  if (
    typeOfOpening === 'type-2' ||
    typeOfOpening === 'type-3' ||
    typeOfOpening === 'type-5'
  ) {
    return;
  }
  if (
    systemOfPVC === '13' ||
    systemOfPVC === 'Salamander' ||
    systemOfPVC === 'Rehau' ||
    systemOfPVC === 'Veka'
  ) {
    addArticleToOrderList(findElementsByArticle(25816), 3);
  }

  if (systemOfPVC === '9') {
    addArticleToOrderList(findElementsByArticle(25850), 3);
  }
}
