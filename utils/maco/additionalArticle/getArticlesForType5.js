import {
  addArticleToOrderList,
  singleOrder,
} from '../../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../../calcFuncs/findElementsByArticle';
import { getCenterLocks } from '../getCenterLocks';

export function getArticlesForType5(options) {
  const { typeOfOpening } = options;
  if (typeOfOpening !== 'type-5') return;
  getCenterLocks(options);
  const quantityOfPlates = getQuantityOfPlates(singleOrder, typeOfOpening);
  if (quantityOfPlates === 0) return;
  const strikePlates = findElementsByArticle(34610);
  const copyStrikePlates = getCopy(strikePlates);
  copyStrikePlates[0].quantity = quantityOfPlates;
  addArticleToOrderList(copyStrikePlates, 10);
  return;
}

function getQuantityOfPlates(order) {
  let quantity = 0;
  order.forEach(element => {
    if (element.VZ) {
      if (element.articleGroupID == 3 || element.articleGroupID === 2) {
        // rewrite logic for type-5
        quantity += element.VZ;
      }
    }
  });

  return quantity;
}

function getCopy(strikePlateArticle) {
  return JSON.parse(JSON.stringify(strikePlateArticle));
}
