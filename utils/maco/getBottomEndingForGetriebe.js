import { addArticleToOrderList } from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';

export function getBottomEndingForGetriebe(options) {
  const {
    width,
    height,
    isTurnTiltGetriebe = false,
    typeOfOpening = 'type-1',
  } = options;
  if (
    (!isTurnTiltGetriebe && typeOfOpening === 'type-2') ||
    typeOfOpening === 'type-5'
  ) {
    return;
  }
  if (typeOfOpening === 'type-3' && height < 800) {
    return;
  }
  if (height >= 470 && height < 1750) {
    addArticleToOrderList(findElementsByArticle(212689), 5);
  }
  if (height >= 1750) {
    addArticleToOrderList(findElementsByArticle(212688), 5);
  }
}
