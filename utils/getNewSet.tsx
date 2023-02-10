import { IFSet } from '@/interfaces/interfaces';

export const getNewSet = (id = '0'): IFSet => {
  id = String(+id + 1);
  return {
    id,
    brand: 'maco',
    width: '',
    height: '',
    isWidthValid: "initial",
    isHeightValid: "initial",
    quantitySet: '1',
    sideOfHinge: 'right',
    systemOfPVC: '13',
    gorizontalLock: false,
    typeOfOpening: 'type-1',
  };
};
