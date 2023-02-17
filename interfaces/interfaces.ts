export const ALLTypeOfHingeSidePressConst = [
  'hingeSidePress-type-1',
  'hingeSidePress-type-2',
  'hingeSidePress-type-3',
  'hingeSidePress-type-4',
  'hingeSidePress-type-5',
  'hingeSidePress-type-6',
  'hingeSidePress-type-7',
] as const;
export const ALLTypeOfOpeningConst = [
  'type-1',
  'type-2',
  'type-3',
  'type-4',
  'type-5',
] as const;

export const ALLSystemOfPVC = [
  '13',
  '9',
  'Rehau',
  'Veka',
  'Salamander',
];

export type TSystemOfPVC = typeof ALLSystemOfPVC[number];

export type TTypeOfHingeSidePress =
  typeof ALLTypeOfHingeSidePressConst[number];

export type TTypeOfOpenimg =
  typeof ALLTypeOfOpeningConst[number];

export interface IFSet {
  id: string;
  brand: 'maco' | 'vorne' | 'winkhaus';
  width: number | undefined;
  height: number | undefined;
  isWidthValid: 'initial' | 'valid' | 'invalid';
  isHeightValid: 'initial' | 'valid' | 'invalid';
  quantitySet: number;
  sideOfHinge: 'left' | 'right';
  systemOfPVC: TSystemOfPVC;
  typeOfOpening: TTypeOfOpenimg;
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
