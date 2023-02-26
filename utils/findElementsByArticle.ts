import { IArticleItem, IMacoJSON } from '@/interfaces/interfaces';
import { maco } from '../data/maco.json';

type TParams = {
  arr: string[];
  sortSignificance: string;
};

export function findElementsByArticle(params: TParams) {
  const articleArray: IArticleItem[] = [];
  params.arr.forEach(article => {
    const item = maco.find(element => String(element.article) === article);
    if (item)
      articleArray.push({
        ...item,
        quantity: '1',
        sortSignificance: params.sortSignificance,
      });
  });
  if (articleArray.length > 0) return articleArray;

  return;
}
