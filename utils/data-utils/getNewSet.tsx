import { IFSet, TBrands, TSystemOfPVC } from '@/interfaces/interfaces';

export const getNewSet = (
  params: { id?: string; brand?: TBrands; systemOfPVC?: TSystemOfPVC } = {}
): IFSet => {
  let { id = '0', brand = 'maco', systemOfPVC = '13' } = params;
  return {
    id,
    brand,
    width: undefined,
    height: undefined,
    isWidthValid: 'initial',
    isHeightValid: 'initial',
    quantitySet: 1,
    sideOfHinge: 'right',
    systemOfPVC,
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
