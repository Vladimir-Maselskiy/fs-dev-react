import { addArticleToOrderList } from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';

export function getCenterLocks(options) {
  const {
    width,
    height,
    shtulpBlock,
    gorizontalLock = false,
    typeOfOpening = 'type-1',
    isTurnTiltGetriebe = false,
  } = options;

  if (typeOfOpening === 'type-5' && shtulpBlock === 'latch') {
    return;
  }

  if (typeOfOpening === 'type-3' && height >= 800 && width >= 470) {
    addArticleToOrderList(findElementsByArticle(211924, 211924), 6);
    return;
  }

  if (gorizontalLock) {
    if (width > 480 && width < 800) {
      addArticleToOrderList(findElementsByArticle(228398), 6);
      if (typeOfOpening === 'type-2' && isTurnTiltGetriebe) {
        addArticleToOrderList(findElementsByArticle(228398), 6);
      }
    }
    if (width >= 800) {
      addArticleToOrderList(findElementsByArticle(211924), 6);
      if (typeOfOpening === 'type-2' && isTurnTiltGetriebe) {
        addArticleToOrderList(findElementsByArticle(211924), 6);
      }
    }
  }

  if (
    typeOfOpening === 'type-2' ||
    typeOfOpening === 'type-3' ||
    typeOfOpening === 'type-5'
  ) {
    return;
  }

  if (height > 480 && height < 800) {
    addArticleToOrderList(findElementsByArticle(228398), 6);
  }
  if (height >= 800 && height < 1280) {
    addArticleToOrderList(findElementsByArticle(211924), 6);
  }
  if (height >= 1280 && height < 1500) {
    addArticleToOrderList(findElementsByArticle(211925), 6);
  }
  if (height >= 1500 && height < 2000) {
    addArticleToOrderList(findElementsByArticle(211926), 6);
  }
  if (height >= 2000 && height < 2200) {
    addArticleToOrderList(findElementsByArticle(211927), 6);
  }
  if (height >= 2200 && height < 2450) {
    addArticleToOrderList(findElementsByArticle(211928), 6);
  }
}
