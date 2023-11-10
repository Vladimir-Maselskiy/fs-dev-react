import { IMacoLocks } from '@/interfaces/interfaces';
import data from '../../data/locks/maco-locks.json';

const macoLocks = data as IMacoLocks[];

export const getLockItemMaco = (article: string) => {
  return macoLocks.find(item => item.article === article);
};
