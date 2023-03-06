import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getArticlesForType2 } from './additionalArticle/getArticlesForType2';
import { getBottomDecor } from './getBottomDecor';
import { getBottomEndingForGetriebe } from './getBottomEndingForGetriebe';
import { getBottomHinge } from './getBottomHinge';
import { getCenterLocks } from './getCenterLocks';
import { getConerGear } from './getConerGear';
import { getHingeSidePress } from './getHingeSidePress';
import { getMicroliftPlate } from './getMiсroliftPlate';
import { getGetriebe } from './Getriebe/getGetriebe';
import { getShear } from './getShear';
import { getStrikeplates } from './getStrikePlates';
import { getTopDecor } from './getTopDecor';
import { getTopHinge } from './getTopHinge';
import { getTurningSlantedPlate } from './getTurningSlantedPlate';

export const getOneMacoSet = (fSet: IFSet): IArticleItem[] => {
  const { width, height, typeOfOpening } = fSet;
  const currentSet: IArticleItem[] = [];
  if (height && width) {
    const getribe = getGetriebe(fSet);
    const conerGear = getConerGear(fSet);
    const shear = getShear(fSet);
    const bottomEndingForGetriebe = getBottomEndingForGetriebe(fSet);
    const centerLocks = getCenterLocks(fSet);
    const microliftPlate = getMicroliftPlate(fSet);
    const turningSlantedPlate = getTurningSlantedPlate(fSet);
    const hingeSidePress = getHingeSidePress(fSet);
    const topDecor = getTopDecor(fSet);
    if (typeOfOpening === 'type-3') topDecor.push(...topDecor);
    const topHinge = getTopHinge(fSet);
    if (typeOfOpening === 'type-3') topHinge.push(...topHinge);
    const bottomHinge = getBottomHinge(fSet);
    const bottomDecor = getBottomDecor(fSet);
    const type2Articles = getArticlesForType2(fSet);
    currentSet.push(
      ...getribe,
      ...conerGear,
      ...shear,
      ...bottomEndingForGetriebe,
      ...centerLocks,
      ...microliftPlate,
      ...turningSlantedPlate,
      ...hingeSidePress,
      ...topDecor,
      ...topHinge,
      ...bottomHinge,
      ...bottomDecor,
      ...type2Articles
    );
    const strikePlates = getStrikeplates(currentSet, fSet);
    currentSet.push(...strikePlates);
  }
  const finalSet = currentSet.map(set => ({
    ...set,
    quantity: (+set.quantity * fSet.quantitySet).toString(),
  }));

  return finalSet;
};
