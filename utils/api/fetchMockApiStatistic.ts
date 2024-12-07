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
  const currentDate = new Date();

  const readableDate = currentDate.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const readableTime = currentDate.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = `${readableDate} ${readableTime}`;
  const totalPrice = getTotalPriceInFTable(dataSourceWithDiscount).toFixed(2);
  axios.post('https://630f7dfe498924524a8f5834.mockapi.io/statistic', {
    userName: user?.name,
    userStatus: user?.status,
    userEmail: user?.email,
    totalPrice,
    date,
    discount,
  });
};
