import { IArticleItem, IMacoJSON } from '@/interfaces/interfaces';
import packageInfo from '../../data/maco.json';

type TParams = {
  arr: string[];
  sortSignificance: string;
  quantity?: number;
};

export function findElementsByArticle(params: TParams) {
  const maco = packageInfo.maco as IMacoJSON[];
  const { arr, sortSignificance, quantity = 1 } = params;
  const articleArray: IArticleItem[] = [];
  arr.forEach(article => {
    const item = maco.find(element => String(element.article) === article);
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
