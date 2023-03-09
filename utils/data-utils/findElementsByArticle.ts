import { IArticleItem, IArticleJSON } from '@/interfaces/interfaces';
import macoPackageInfo from '../../data/maco.json';
import vornePackageInfo from '../../data/vorne.json';

type TParams = {
  brand?: string;
  arr: string[];
  sortSignificance: string;
  quantity?: number;
};

export function findElementsByArticle(params: TParams) {
  const maco = macoPackageInfo.maco as IArticleJSON[];
  const vorne = vornePackageInfo.vorne as IArticleJSON[];
  let data: IArticleJSON[];
  switch (params.brand) {
    case undefined:
      data = maco;
      break;
    case 'vorne':
      data = vorne;
      break;
  }
  const { arr, sortSignificance, quantity = 1 } = params;
  const articleArray: IArticleItem[] = [];
  arr.forEach(article => {
    const item = data.find(element => String(element.article) === article);
    if (item)
      articleArray.push({
        ...item,
        quantity: quantity.toString(),
        sortSignificance: sortSignificance,
      });
  });
  if (articleArray.length > 0) return articleArray;

  return;
}
