import React from 'react';
import { StyledCanvasVerticalLock } from './CanvasVerticalLock.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getVerticalIconHeight } from '@/utils/canvas/getVerticalIconHeight';
import { getVerticalLockIcon } from '@/utils/canvas/getDafaultVerticalLockIcon';
import { Button, Popover } from 'antd';
import { getDefaultVerticalLock } from '@/utils/canvas/getDefaultVerticalLock';
import { getItemNameByArticle } from '@/utils/maco/getItemNameByArticle';
import { CanvasIconByArticle } from '../CanvasIconByArticle/CanvasIconByArticle';
import { Box } from '@/components/Box/Box';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  outterPadding: number;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CanvasVerticalLock = ({
  fSet,
  setFSet,
  outterPadding,
  setIsListOpen,
}: TProps) => {
  const defaultVerticalLock = getDefaultVerticalLock(fSet);
  const VerticalLockIcon = getVerticalLockIcon(fSet);

  const onDeleteButtonClick = () => {
    setFSet(prev => ({ ...prev, optionalVerticalLock: [] }));
  };

  const onExtendButtonClick = () => {
    setIsListOpen(true);
  };

  return (
    (defaultVerticalLock && !fSet.optionalVerticalLock && (
      <StyledCanvasVerticalLock
        side={fSet.sideOfHinge}
        iconHeight={getVerticalIconHeight(fSet)}
        outterPadding={outterPadding}
      >
        <Popover
          title={`арт.${defaultVerticalLock.article} ${defaultVerticalLock.name}`}
          content={<Button onClick={onDeleteButtonClick}>Видалить</Button>}
          trigger="click"
        >
          {VerticalLockIcon && <VerticalLockIcon />}
        </Popover>
      </StyledCanvasVerticalLock>
    )) ||
    (fSet.optionalVerticalLock && (
      <StyledCanvasVerticalLock
        side={fSet.sideOfHinge}
        iconHeight={getVerticalIconHeight(fSet)}
        outterPadding={outterPadding}
      >
        {fSet.optionalVerticalLock.map((article, index) => (
          <div key={index}>
            <Popover
              title={`арт.${article} ${getItemNameByArticle(article)}`}
              content={
                <Box>
                  <Button onClick={onDeleteButtonClick}>Видалить</Button>
                  <Button onClick={onExtendButtonClick}>Приєднати ще</Button>
                </Box>
              }
              trigger="click"
            >
              <Box>
                <CanvasIconByArticle article={article} />
              </Box>
            </Popover>
          </div>
        ))}
      </StyledCanvasVerticalLock>
    )) ||
    null
  );
};
