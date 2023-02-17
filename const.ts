const maco = {
  minWidth: 400,
  maxWidth: 1300,
  minHeight: 470,
  maxHeight: 2400,
};

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
  maxHeight: 800,
};

export const macoRestrictions = {
  minWith: 300,
  maxWidth: 1300,
  minHeight: 470,
  maxHeight: 2500,
};
export const winkhausRestrictions = {
  minWith: 300,
  maxWidth: 1300,
  minHeight: 470,
  maxHeight: 2500,
};

export const vorneRestrictions = {
  minWith: 300,
  maxWidth: 1300,
  minHeight: 470,
  maxHeight: 2500,
};
export default { maco };
