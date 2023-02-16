import {
  macoRestrictions,
  TRestrictions,
  type3Restrictions,
  vorneRestrictions,
} from '@/const';
import { IFSet } from '@/interfaces/interfaces';

export const getSetRestrictions = (
  fSet: IFSet
): TRestrictions => {
  if (fSet.typeOfOpening === 'type-3') {
    return type3Restrictions;
  }

  switch (fSet.brand) {
    case 'maco':
      return macoRestrictions;
    case 'vorne':
      return vorneRestrictions;
    case 'winkhaus':
      return macoRestrictions;
  }
};
