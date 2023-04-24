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
] as const;

export const ALLDecor = [
  'white',
  'brown',
  'silver',
  'titan',
  'anthracite',
  'black',
  'bronze',
] as const;

export const ALLBrands = ['maco', 'vorne', 'winkhaus'] as const;

export type TSystemOfPVC = typeof ALLSystemOfPVC[number];

export type TTypeOfHingeSidePress = typeof ALLTypeOfHingeSidePressConst[number];

export type TTypeOfOpenimg = typeof ALLTypeOfOpeningConst[number];

export type TBrands = typeof ALLBrands[number];

export type TDecor = typeof ALLDecor[number];

export interface IFSet {
  id: string;
  brand: TBrands;
  width: number | undefined;
  height: number | undefined;
  isWidthValid: 'initial' | 'valid' | 'invalid';
  isHeightValid: 'initial' | 'valid' | 'invalid';
  quantitySet: number;
  sideOfHinge: 'left' | 'right';
  systemOfPVC: TSystemOfPVC;
  typeOfOpening: TTypeOfOpenimg;
  hanleDistance: number | undefined;
  decor: TDecor;
  shtulpGetriebe: 'shtulpGetriebe' | 'latch';
  isTurnTiltGetriebe: boolean;
  typeOfHingeSidePress: TTypeOfHingeSidePress;
  microVentilation: boolean;
  isGorizontalLock: boolean;
  isWithoutBottomHinge: boolean;
  isAntiBreakingOpen: boolean;
  antiBreakingOpenType: 'base' | 'rc1';
}

export interface IFSetsArray {
  fSetsArray: IFSet[];
}

export interface IArticleJSON {
  article: string;
  id: string;
  name: string;
  price: string;
  VZ?: string;
  iS?: string;
}

export interface IArticleItem {
  article: string;
  name: string;
  quantity: string;
  price: string;
  sortSignificance: string;
  VZ?: string;
  iS?: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: string | null;
  name: string;
  accessToken: string | null;
  refreshToken: string | null;
  isActivated: boolean;
}
