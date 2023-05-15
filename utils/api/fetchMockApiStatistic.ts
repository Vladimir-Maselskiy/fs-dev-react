import { IItem } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { IUser } from '@/interfaces/interfaces';
import axios from 'axios';
import { getTotalPriceInFTable } from '../data-utils/getTotalPriceInFTable';

export const fetchMockApiStatistic = ({
  user,
  dataSourceWithDiscount,
  discount,
}: {
  user: IUser | null;
  dataSourceWithDiscount: IItem[];
  discount: number;
}) => {
  const date = new Date().toString();
  const totalPrice = getTotalPriceInFTable(dataSourceWithDiscount).toFixed(2);
  axios.post('https://630f7dfe498924524a8f5834.mockapi.io/statistic', {
    userName: user?.name,
    userEmail: user?.email,
    totalPrice,
    date,
    discount,
  });
};
