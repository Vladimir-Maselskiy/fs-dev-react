export interface IFSet {
  id: string;
  brand: 'maco' | 'vorne';
  width: string;
  height: string;
  isWidthValid: boolean;
  isHeightValid: boolean;
  quantitySet: string;
  sideOfHinge: 'left' | 'right';
  systemOfPVC: '13' | '9' | 'Rehau' | 'Veka' | 'Salamander';
  gorizontalLock: boolean;
  typeOfOpening:
    | 'type-1'
    | 'type-2'
    | 'type-3'
    | 'type-4'
    | 'type-5';
}
export interface IFSetsArray {
  fSetsArray: IFSet[];
}
