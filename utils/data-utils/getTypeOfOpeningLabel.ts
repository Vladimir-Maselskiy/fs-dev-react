import { typeOfOpeningSelectOpions } from '@/const';
import { TTypeOfOpenimg } from '@/interfaces/interfaces';
import { type } from 'os';

const typeOfOpening = typeOfOpeningSelectOpions;

export const getTypeOfOpeningLabel = (value: TTypeOfOpenimg) => {
  return typeOfOpening.find(currentType => currentType.value === value)?.label;
};
