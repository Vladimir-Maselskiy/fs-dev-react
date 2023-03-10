import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getGetriebe } from './Getriebe/getGetriebe';

export const getOneVorneSet = (fSet: IFSet): IArticleItem[] => {
  const { width, height, typeOfOpening } = fSet;
  const currentSet: IArticleItem[] = [];

  const getribe = getGetriebe(fSet);
  // const conerGear = getConerGear(fSet);
  // const shear = getShear(fSet);
  // const bottomEndingForGetriebe = getBottomEndingForGetriebe(fSet);
  // const gorizontalLocks = getGorizontalLocks(fSet);
  // const verticalLocks = getVerticalLocks(fSet);
  // const microliftPlate = getMicroliftPlate(fSet);
  // const turningSlantedPlate = getTurningSlantedPlate(fSet);
  // const hingeSidePress = getHingeSidePress(fSet);
  // const topDecor = getTopDecor(fSet);
  // const topHinge = getTopHinge(fSet);
  // const bottomHinge = getBottomHinge(fSet);
  // const bottomDecor = getBottomDecor(fSet);
  // const type2Articles = getArticlesForType2(fSet);
  // const type3Articles = getArticlesForType3(fSet);
  // const type5Articles = getArticlesForType5(fSet);
  currentSet.push(
    ...getribe
    //   ...conerGear,
    //   ...shear,
    //   ...bottomEndingForGetriebe,
    //   ...gorizontalLocks,
    //   ...verticalLocks,
    //   ...microliftPlate,
    //   ...turningSlantedPlate,
    //   ...hingeSidePress,
    //   ...topDecor,
    //   ...topHinge,
    //   ...bottomHinge,
    //   ...bottomDecor,
    //   ...type2Articles,
    //   ...type3Articles,
    //   ...type5Articles
  );
  //     const strikePlates = getStrikeplates(currentSet, fSet);
  //     if (+strikePlates[0].quantity > 0) currentSet.push(strikePlates[0]);
  //     if (+strikePlates[1].quantity > 0) currentSet.push(strikePlates[1]);
  //   }
  const finalSet = currentSet.map(set => ({
    ...set,
    quantity: (+set.quantity * fSet.quantitySet).toString(),
  }));

  return finalSet;
};
