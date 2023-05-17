import { IItem } from '@/components/FSetsOrderTable/FSetsOrderTable';

export const getMaxCeilLength = (data: IItem[], key: keyof IItem) => {
  const valuesArray = data.map(item => item[key].toString().length * 1.6);
  return Math.max(14, ...valuesArray);
};
