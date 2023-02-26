import {
  addArticleToOrderList,
  singleOrder,
  clearSingleOrder,
} from '../actionFuncs/addArticleToOrderList';
import { findElementsByArticle } from '../calcFuncs/findElementsByArticle';

export function getStrikeplates(options) {
  const { systemOfPVC, typeOfOpening } = options;
  const quantityOfPlates = getQuantityOfPlates(singleOrder, typeOfOpening);

  if (systemOfPVC === '13' || systemOfPVC === 'Salamander') {
    const strikePlates = findElementsByArticle(34824);
    const copyStrikePlates = getCopy(strikePlates);
    addStrikePlates(copyStrikePlates, quantityOfPlates);
    return;
  }
  if (systemOfPVC === 'Rehau') {
    const strikePlates = findElementsByArticle(354970);
    const copyStrikePlates = getCopy(strikePlates);
    addStrikePlates(copyStrikePlates, quantityOfPlates);
    return;
  }
  if (systemOfPVC === 'Veka') {
    const strikePlates = findElementsByArticle(34283);
    const copyStrikePlates = getCopy(strikePlates);
    addStrikePlates(copyStrikePlates, quantityOfPlates);
    return;
  }
  if (systemOfPVC === '9') {
    const strikePlates = findElementsByArticle(34850);
    const copyStrikePlates = getCopy(strikePlates);
    addStrikePlates(copyStrikePlates, quantityOfPlates);
    return;
  }
}

function getQuantityOfPlates(order, typeOfOpening) {
  let quantity = 0;
  order.forEach(element => {
    if (element.VZ) {
      if (
        (element.articleGroupID !== 3 && element.articleGroupID !== 2) ||
        typeOfOpening !== 'type-4'
      ) {
        quantity += element.VZ;
      }
    }
  });
  clearSingleOrder();
  return quantity;
}

function getCopy(strikePlateArticle) {
  return JSON.parse(JSON.stringify(strikePlateArticle));
}

function addStrikePlates(copyStrikePlates, quantityOfPlates) {
  if (quantityOfPlates === 0) {
    return;
  }
  copyStrikePlates[0].quantity = quantityOfPlates;
  addArticleToOrderList(copyStrikePlates, 10);
}
