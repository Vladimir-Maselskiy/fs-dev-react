import { SetsListItem } from '@/components/FSetsListTable/FSetsListTable';
import { IFSet, TTypeOfOpenimg } from '@/interfaces/interfaces';

export const getSetsListDataSource = (sets: IFSet[]): SetsListItem[] => {
  const getType = (type: TTypeOfOpenimg) => {
    switch (type) {
      case 'type-1':
        return 'П/о';
      case 'type-2':
        return 'Пов.';
      case 'type-3':
        return 'Фрам.';
      case 'type-4':
        return 'Шт.Ак.';
      case 'type-5':
        return 'Шт.Пас.';
    }
  };
  const getSideOfHinge = (type: 'left' | 'right') => {
    return type === 'right' ? ' Пр.' : ' Лв.';
  };
  return sets.map((set, index) => {
    const {
      id,
      brand,
      typeOfOpening,
      width,
      height,
      quantitySet,
      sideOfHinge,
    } = set;

    return {
      id,
      key: id,
      height,
      width,
      name: brand.toUpperCase(),
      quantity: quantitySet,
      rowNumber: (index + 1).toString(),
      type: getType(typeOfOpening) + getSideOfHinge(sideOfHinge),
    };
  });
};
