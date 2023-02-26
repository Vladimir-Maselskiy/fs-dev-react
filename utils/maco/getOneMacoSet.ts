import { IArticleItem, IFSet } from '@/interfaces/interfaces';
import { getGetriebe } from './Getriebe/getGetriebe';

export const getOneMacoSet = (fSet: IFSet): IArticleItem[] => {
  const currentSet: IArticleItem[] = [];
  if (fSet.height && fSet.width) {
    console.log(getGetriebe(fSet));
  }

  return currentSet;
};
