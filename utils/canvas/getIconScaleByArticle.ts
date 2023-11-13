import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getLockItemMacoByArticle } from './getLockItemMacoByArticle';

export const getIconScaleByArticle = ({
  item,
  sideLength,
}: {
  item: IArticleItem;
  sideLength: number;
}): string => {
  const a = getLockItemMacoByArticle(item.article)?.length;
  const currentScale = Math.min(
    (getLockItemMacoByArticle(item.article)?.length || 0) / sideLength,
    1
  );
  return currentScale * 100 + '%';
};
