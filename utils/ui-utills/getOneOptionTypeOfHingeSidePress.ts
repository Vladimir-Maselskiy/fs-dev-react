import { IFSet } from '@/interfaces/interfaces';
import { typeOfHingeSidePressConst } from '../../const';

export const getOneOptionTypeOfHingeSidePress = (
  fSet: IFSet | undefined
): { value: string; label: string } | undefined => {
  return typeOfHingeSidePressConst.find(
    el => el.value === fSet?.typeOfHingeSidePress
  );
};
