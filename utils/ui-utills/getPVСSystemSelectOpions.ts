import {
  system9MMSelectOpions,
  systemRehauSelectOpions,
  systemSalamanerSelectOpions,
  systemVekaSelectOpions,
} from '@/const';
import { TSystemOfPVC } from '@/interfaces/interfaces';

export const getPVСSystemSelectOpions = (
  brand: 'maco' | 'vorne' | 'winkhaus' | undefined
): { value: TSystemOfPVC; label: string }[] | undefined => {
  if (brand === 'maco')
    return [
      ...systemSalamanerSelectOpions,
      ...systemVekaSelectOpions,
      ...systemRehauSelectOpions,
      ...system9MMSelectOpions,
    ];
  if (brand === 'vorne')
    return [...systemSalamanerSelectOpions, ...system9MMSelectOpions];
  if (brand === 'winkhaus')
    return [
      ...systemSalamanerSelectOpions,
      ...systemVekaSelectOpions,
      ...systemRehauSelectOpions,
    ];
};
