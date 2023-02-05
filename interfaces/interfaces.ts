export interface IFSet {
  id: string;
  width: number;
  height: number;
  quantitySet: number;
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
