import { addArticleToOrderList } from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';
import { getExtension } from '../additionalArticle/getExtension';

export function getConstGetriebe(height, hanleDistance) {
  let cutGetriebeLength = null;

  if (hanleDistance >= 235 && hanleDistance <= 400) {
    addArticleToOrderList(findElementsByArticle(201746, 213287, 213287), 3);
    cutGetriebeLength = hanleDistance + 400;
  }

  if (hanleDistance > 400 && hanleDistance <= 625) {
    addArticleToOrderList(findElementsByArticle(212156), 3);
    cutGetriebeLength = hanleDistance + 625;
  }
  // if (hanleDistance > 625 && hanleDistance <= 675) {
  //   addArticleToOrderList(findElementsByArticle(225098), 3);
  //   cutGetriebeLength = hanleDistance + 675;
  // }
  if (hanleDistance > 625 && hanleDistance <= 875) {
    addArticleToOrderList(findElementsByArticle(212158), 3);
    cutGetriebeLength = hanleDistance + 875;
  }
  if (hanleDistance > 875) {
    addArticleToOrderList(findElementsByArticle(212160), 3);
    cutGetriebeLength = hanleDistance + 1125;
  }

  //   блок подовжувачів, при потребі

  if (height - cutGetriebeLength > 0) {
    getExtension(height - cutGetriebeLength);
  }

  // подовжувачі знизу, при потребі

  if (hanleDistance - 1125 > 0) {
    getExtension(hanleDistance - 1125);
  }
}
