import React from 'react';
import Icon211924 from '../../../../public/articlesSVG/211924.svg';
import Icon211926 from '../../../../public/articlesSVG/211926.svg';
import Icon211928 from '../../../../public/articlesSVG/211928.svg';
import Icon211976 from '../../../../public/articlesSVG/211976.svg';

type TProps = {
  article: string;
};

export const CanvasIconByArticle = ({ article }: TProps) => {
  if (article === '228398' || article === '211924' || article === '211925') {
    return <Icon211924 />;
  }

  if (article === '211926' || article === '211927') return <Icon211926 />;

  if (article === '211928') return <Icon211928 />;
  if (article === '211976') return <Icon211976 />;

  return null;
};
