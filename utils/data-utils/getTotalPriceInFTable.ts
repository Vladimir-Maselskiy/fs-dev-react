import { IItem } from '@/components/FSetsOrderTable/FSetsOrderTable';

export const getTotalPriceInFTable = (dataSource: readonly object[]) => {
  return dataSource.reduce((acc, item) => {
    const currentItem = item as IItem;
    return acc + +currentItem.sum;
  }, 0);
};
