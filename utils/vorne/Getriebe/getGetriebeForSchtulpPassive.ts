import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getLatch } from '../additionalArticle/getLatch';
import { getStrikePlatesForShtulp } from '../additionalArticle/getStrikePlatesForShtulp';

export function getGetriebeForSchtulpPassive(fSet: IFSet) {
  const { shtulpGetriebe } = fSet;
  const articleItems: IArticleItem[] = [];
  if (shtulpGetriebe !== 'latch') return [];

  if (shtulpGetriebe === 'latch') {
    const latch = getLatch(fSet);
    if (latch) articleItems.push(...latch);
  }

  const stikePlates = getStrikePlatesForShtulp(fSet);
  if (stikePlates) articleItems.push(...stikePlates);
  return articleItems;
}
