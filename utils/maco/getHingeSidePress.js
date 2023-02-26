import { addArticleToOrderList } from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';
import { getTopDecor } from './getTopDecor';
import { getTopHinge } from './getTopHinge';

export function getHingeSidePress(options) {
  const { typeOfOpening = 'type-1', hingeSidePress = 'hinge-side-press-type-2' } = options;

  if (typeOfOpening === 'type-1' || typeOfOpening === 'type-4') {
    return;
  }

  if (hingeSidePress === 'hinge-side-press-type-7') {
    return;
  }
  if (hingeSidePress === 'hinge-side-press-type-1') {
    addArticleToOrderList(findElementsByArticle(54783, 41342, 41339), 10.5);
    return;
  }
  if (hingeSidePress === 'hinge-side-press-type-2') {
    addArticleToOrderList(findElementsByArticle(54783, 41342, 41339), 10.5);
    addArticleToOrderList(findElementsByArticle(54783, 41342, 41339), 10.5);
    return;
  }
  if (hingeSidePress === 'hinge-side-press-type-3') {
    addArticleToOrderList(findElementsByArticle(94030), 10.5);
  }
  if (hingeSidePress === 'hinge-side-press-type-4') {
    addArticleToOrderList(findElementsByArticle(94030), 10.5);
    addArticleToOrderList(findElementsByArticle(94030), 10.5);
  }
  if (hingeSidePress === 'hinge-side-press-type-5') {
    addArticleToOrderList(findElementsByArticle(52321), 10.5);
  }
  if (hingeSidePress === 'hinge-side-press-type-6') {
    addArticleToOrderList(findElementsByArticle(52321), 10.5);
    addArticleToOrderList(findElementsByArticle(52321), 10.5);
  }

  if (
    hingeSidePress === 'hinge-side-press-type-3' ||
    hingeSidePress === 'hinge-side-press-type-5'
  ) {
    getTopDecor(options);
    getTopHinge(options);
  }
  if (
    hingeSidePress === 'hinge-side-press-type-4' ||
    hingeSidePress === 'hinge-side-press-type-6'
  ) {
    getTopDecor(options);
    getTopDecor(options);
    getTopHinge(options);
    getTopHinge(options);
  }
}
