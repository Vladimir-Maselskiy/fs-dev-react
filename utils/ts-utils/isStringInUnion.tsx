import { TTypeOfHingeSidePress } from '@/interfaces/interfaces';

export const isStringInUnion = (
  str: string,
  array: readonly string[]
): str is TTypeOfHingeSidePress => {
  return array.includes(str);
};
