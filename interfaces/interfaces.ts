export const ALLTypeOfHingeSidePressConst = [
  'hingeSidePress-type-1',
  'hingeSidePress-type-2',
  'hingeSidePress-type-3',
  'hingeSidePress-type-4',
  'hingeSidePress-type-5',
  'hingeSidePress-type-6',
  'hingeSidePress-type-7',
] as const;

export type TTypeOfHingeSidePress =
  typeof ALLTypeOfHingeSidePressConst[number];

export interface IFSet {
  id: string;
  brand: 'maco' | 'vorne';
  width: string;
  height: string;
  isWidthValid: 'initial' | 'valid' | 'invalid';
  isHeightValid: 'initial' | 'valid' | 'invalid';
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
  hanleDistance: string | undefined;
  shtulpGetriebe: 'shtulpGetriebe' | 'latch';
  isTurnTiltGetriebe: boolean;
  typeOfHingeSidePress: TTypeOfHingeSidePress;
  microVentilation: boolean;
  isGorizontalLock: boolean;
  isWithoutBottomHinge: boolean;
}

export interface IFSetsArray {
  fSetsArray: IFSet[];
}
