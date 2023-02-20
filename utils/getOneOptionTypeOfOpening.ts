import { IFSet } from '@/interfaces/interfaces';
import { typeOfOpeningSelectOpions } from '../const';

export const getOneOptionTypeOfOpening = (
  fSet: IFSet | undefined
): { value: string; label: string } | undefined => {
  const res = typeOfOpeningSelectOpions.find(
    el => el.value === fSet?.typeOfOpening
  );
  //   console.log('fSet', fSet);
  //   console.log(
  //     'typeOfOpeningSelectOpions',
  //     typeOfOpeningSelectOpions
  //   );
  //   console.log('res', res);
  return res;
};
