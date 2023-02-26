import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getBottomEndingForGetriebe } from './getBottomEndingForGetriebe';
import { getCenterLocks } from './getCenterLocks';
import { getConerGear } from './getConerGear';
import { getGetriebe } from './Getriebe/getGetriebe';
import { getShear } from './getShear';

export const getOneMacoSet = (fSet: IFSet): IArticleItem[] => {
  const currentSet: IArticleItem[] = [];
  if (fSet.height && fSet.width) {
    const getribe = getGetriebe(fSet);
    const conerGear = getConerGear(fSet);
    const shear = getShear(fSet);
    const bottomEndingForGetriebe = getBottomEndingForGetriebe(fSet);
    const centerLocks = getCenterLocks(fSet);
    currentSet.push(
      ...getribe,
      ...conerGear,
      ...shear,
      ...bottomEndingForGetriebe,
      ...centerLocks
    );
  }

  return currentSet;
};
