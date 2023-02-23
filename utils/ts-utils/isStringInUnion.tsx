import {
  TDecor,
  TSystemOfPVC,
  TTypeOfHingeSidePress,
  TTypeOfOpenimg,
} from '@/interfaces/interfaces';

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
export const isStringInUnionSystemOfPVC = (
  str: string,
  array: readonly string[]
): str is TSystemOfPVC => {
  return array.includes(str);
};
export const isStringInUnionDecor = (
  str: string,
  array: readonly string[]
): str is TDecor => {
  return array.includes(str);
};
