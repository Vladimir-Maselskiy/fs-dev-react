import { IMacoLocks } from '@/interfaces/interfaces';
import data from '../../data/locks/maco-tech.json';

const macoLocks = data as IMacoLocks[];

export const getLockItemMacoByArticle = (article: string) => {
  return macoLocks.find(item => item.article === article);
};
