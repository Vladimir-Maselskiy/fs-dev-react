import { IFSet, TBrands } from '@/interfaces/interfaces';

export const getNewSet = (
  params: { id?: string; brand?: TBrands } = {}
): IFSet => {
  let { id = '0', brand = 'maco' } = params;
  return {
    id,
    brand,
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
    isAntiBreakingOpen: false,
    antiBreakingOpenType: 'base',
    decor: 'white',
  };
};
