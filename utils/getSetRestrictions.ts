import {
  macoRestrictions,
  TRestrictions,
  type3Restrictions,
  vorneRestrictions,
  winkhausRestrictions,
} from '@/const';
import { TTypeOfOpenimg } from '@/interfaces/interfaces';

export const getSetRestrictions = (
  typeOfOpening: TTypeOfOpenimg,
  brand: 'maco' | 'vorne' | 'winkhaus'
): TRestrictions => {
  // console.log('typeOfOpening', typeOfOpening, 'brand', brand, new Date());
  if (typeOfOpening === 'type-3') {
    return type3Restrictions;
  }

  switch (brand) {
    case 'maco':
      return macoRestrictions;
    case 'vorne':
      return vorneRestrictions;
    case 'winkhaus':
      return winkhausRestrictions;
    // default:
    //   return macoRestrictions;
  }
};
