import { IFSet } from '@/interfaces/interfaces';

export const getNewSet = (id = '0'): IFSet => {
  id = String(+id + 1);
  return {
    id,
    brand: 'maco',
    width: undefined,
    height: undefined,
    isWidthValid: 'initial',
    isHeightValid: 'initial',
    quantitySet: 1,
    sideOfHinge: 'right',
    systemOfPVC: '13',
    typeOfOpening: 'type-1',
    hanleDistance: undefined,
    shtulpGetriebe: 'latch',
    isTurnTiltGetriebe: false,
    typeOfHingeSidePress: 'hingeSidePress-type-2',
    microVentilation: true,
    isGorizontalLock: false,
    isWithoutBottomHinge: false,
    antiBreakingOpen: false,
  };
};
