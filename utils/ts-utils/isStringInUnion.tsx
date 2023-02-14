import { TTypeOfHingeSidePress, TTypeOfOpenimg } from '@/interfaces/interfaces';

export const isStringInUnionTypeOfHingeSidePress = (
  str: string,
  array: readonly string[]
): str is TTypeOfHingeSidePress => {
  return array.includes(str);
};
export const isStringInUnionTypeOfOpening = (
  str: string,
  array: readonly string[]
): str is TTypeOfOpenimg => {
  return array.includes(str);
};
