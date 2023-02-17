import {
  system9MMSelectOpions,
  systemRehauSelectOpions,
  systemSalamanerSelectOpions,
  systemVekaSelectOpions,
} from '@/const';
import { IFSet } from '@/interfaces/interfaces';

export const getPVСSystemSelectOpions = (
  fSet: IFSet | undefined
): { value: string; label: string }[] | undefined => {
  if (fSet) {
    if (fSet.brand === 'maco')
      return [
        ...systemSalamanerSelectOpions,
        ...systemVekaSelectOpions,
        ...systemRehauSelectOpions,
        ...system9MMSelectOpions,
      ];
    if (fSet.brand === 'vorne')
      return [
        ...systemSalamanerSelectOpions,
        ...system9MMSelectOpions,
      ];
    if (fSet.brand === 'winkhaus')
      return [
        ...systemSalamanerSelectOpions,
        ...systemVekaSelectOpions,
        ...systemRehauSelectOpions,
      ];
  }
};
