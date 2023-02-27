import { DataType } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { IArticleItem } from '@/interfaces/interfaces';

export const getDataSource = (sets: IArticleItem[]): DataType[] => {
  return sets.map((set, index) => ({
    article: set.article,
    key: set.article,
    name: set.name,
    price: (+set.price).toFixed(2),
    quantity: +set.quantity,
    rowNumber: (index + 1).toString(),
    sum: (+set.price * +set.quantity).toFixed(2),
  }));
};
