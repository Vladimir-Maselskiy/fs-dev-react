import { addArticleToOrderList } from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';
import { getMicroVentilationPlate } from './additionalArticle/getMicroVentilationPlate';

export function getConerGear(options) {
  const { systemOfPVC, microVentilation = true, typeOfOpening = 'type-1' } = options;
  if (typeOfOpening === 'type-2' || typeOfOpening === 'type-3' || typeOfOpening === 'type-5') {
    return;
  }
  if (microVentilation) {
    addArticleToOrderList(findElementsByArticle(228430), 2);
    getMicroVentilationPlate(options);
    return;
  }

  addArticleToOrderList(findElementsByArticle(211974), 2);
}
