import { IFSet } from '@/interfaces/interfaces';

export const getIndexByBrand = (fSet: IFSet) => {
  switch (fSet.brand) {
    case 'maco':
      return 0;
    case 'vorne':
      return 1;
    case 'winkhaus':
      return 2;
  }
};
