import { IItem } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { IArticleItem } from '@/interfaces/interfaces';

export const getDataSource = (
  sets: IArticleItem[],
  rate: string,
  discount = 0,
  userPrice = 1
): IItem[] => {
  return sets.map((set, index) => ({
    article: set.article,
    key: set.article,
    name: set.name,
    price: (+set.price * +rate * userPrice * ((100 - discount) / 100)).toFixed(
      2
    ),
    quantity: +set.quantity,
    rowNumber: (index + 1).toString(),
    discount,
    sum: (
      +set.price *
      +set.quantity *
      userPrice *
      +rate *
      ((100 - discount) / 100)
    ).toFixed(2),
  }));
};
