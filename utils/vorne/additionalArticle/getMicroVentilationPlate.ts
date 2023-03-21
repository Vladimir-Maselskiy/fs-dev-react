import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { findElementsByArticle } from '@/utils/data-utils/findElementsByArticle';

export function getMicroVentilationPlate(fSet: IFSet) {
  const { systemOfPVC } = fSet;
  const articleItems: IArticleItem[] = [];

  if (
    systemOfPVC === '13' ||
    systemOfPVC === 'Salamander' ||
    systemOfPVC === 'Rehau' ||
    systemOfPVC === 'Veka'
  ) {
    const params = {
      brand: 'vorne',
      arr: ['V.3602.0102'],
      sortSignificance: '13',
    };
    const currentArticleItems = findElementsByArticle(params);
    if (currentArticleItems) articleItems.push(...currentArticleItems);
  }

  return articleItems;
}
