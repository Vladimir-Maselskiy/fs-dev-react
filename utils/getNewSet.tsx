import { IFSet } from '@/interfaces/interfaces';

export const getNewSet = (id = '0'): IFSet => {
  id = String(+id + 1);
  return {
    id,
    brand: 'maco',
    width: '',
    height: '',
    isWidthValid: false,
    isHeightValid: false,
    quantitySet: '1',
    sideOfHinge: 'right',
    systemOfPVC: '13',
    gorizontalLock: false,
    typeOfOpening: 'type-1',
  };
};
