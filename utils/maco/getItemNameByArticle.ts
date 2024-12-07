import maco from '../../data/maco.json';
export const getItemNameByArticle = (article: string) => {
  return maco.find(item => item.article === article)?.name;
};
