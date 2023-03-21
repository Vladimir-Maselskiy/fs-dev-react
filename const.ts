export const typeOfHingeSidePressConst = [
  {
    value: 'hingeSidePress-type-1',
    label: ' 1шт - накладний',
  },
  {
    value: 'hingeSidePress-type-2',
    label: '2шт - накладний',
  },
  {
    value: 'hingeSidePress-type-3',
    label: '1шт - фальц. петля нерег.',
  },
  {
    value: 'hingeSidePress-type-4',
    label: '2шт - фальц. петля нерег.',
  },
  {
    value: 'hingeSidePress-type-5',
    label: '1шт - фальц. петля рег.',
  },
  {
    value: 'hingeSidePress-type-6',
    label: '2шт - фальц. петля рег.',
  },
  {
    value: 'hingeSidePress-type-7',
    label: 'Без прижиму',
  },
];
export const typeOfOpeningSelectOpions = [
  { value: 'type-1', label: 'Поворотно-відкидна' },
  { value: 'type-2', label: 'Поворотна' },
  { value: 'type-3', label: 'Фрамуга' },
  { value: 'type-4', label: 'Штульп активна' },
  { value: 'type-5', label: 'Штульп пасивна' },
];
export const decorBase = [
  { value: 'white' as const, label: 'Білий' },
  { value: 'brown' as const, label: 'Коричневий' },
];
export const decorAnthracite = [
  { value: 'anthracite' as const, label: 'Антрацит' },
];
export const decorSilver = [{ value: 'silver' as const, label: 'Срібло' }];
export const decorTitan = [{ value: 'titan' as const, label: 'Титан' }];
export const decorBlack = [{ value: 'black' as const, label: 'Чорний' }];
export const decorBronze = [{ value: 'bronze' as const, label: 'Бронза' }];
export const decor = [
  ...decorBase,
  ...decorSilver,
  ...decorAnthracite,
  ...decorTitan,
  ...decorBlack,
  ...decorBronze,
];

export const systemSalamanerSelectOpions = [
  { value: '13' as const, label: '13-та серія' },
  { value: 'Salamander' as const, label: 'Salamander' },
];
export const system9MMSelectOpions = [
  { value: '9' as const, label: '9-та серія' },
];
export const systemRehauSelectOpions = [
  { value: 'Rehau' as const, label: 'Rehau' },
];
export const systemVekaSelectOpions = [
  { value: 'Veka' as const, label: 'Veka/Decco' },
];

export type TRestrictions = {
  minWith: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
};

export const type3Restrictions = {
  minWith: 300,
  maxWidth: 2400,
  minHeight: 350,
  maxHeight: 2450,
};

export const macoRestrictions = {
  minWith: 220,
  maxWidth: 1300,
  minHeight: 470,
  maxHeight: 2500,
};

export const winkhausRestrictions = {
  minWith: 400,
  maxWidth: 1300,
  minHeight: 470,
  maxHeight: 2500,
};

export const vorneRestrictions = {
  minWith: 280,
  maxWidth: 1300,
  minHeight: 470,
  maxHeight: 2200,
};

export const minGorizontalLockWidthRestrictions = {
  maco: 400,
  vorne: 400,
  winkhaus: 400,
};
