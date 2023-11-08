import React from 'react';
import {
  StyledCanvasVerticalLock,
  StyledIconWrapper,
} from './CanvasVerticalLock.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getVerticalIconHeight } from '@/utils/canvas/getVerticalIconHeight';
import { getVerticalLockIcon } from '@/utils/canvas/getDafaultVerticalLockIcon';
import { Button, Popover } from 'antd';
import { getDefaultVerticalLock } from '@/utils/canvas/getDefaultVerticalLock';
import { getItemNameByArticle } from '@/utils/maco/getItemNameByArticle';
import { CanvasIconByArticle } from '../CanvasIconByArticle/CanvasIconByArticle';
import { Box } from '@/components/Box/Box';
import { getCurrentIconSize } from '@/utils/canvas/getCurrentIconSize';
import { getOptionalVerticalOffset } from '@/utils/canvas/getOptionalVerticalOffset';

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
    if (fSet.optionalVerticalLock) {
      setFSet(prev => ({
        ...prev,
        optionalVerticalLock: prev.optionalVerticalLock!.slice(0, -1),
      }));
    } else {
      setFSet(prev => ({
        ...prev,
        optionalVerticalLock: [],
      }));
    }
  };

  const onExtendButtonClick = () => {
    setIsListOpen(true);
  };

  return (
    (defaultVerticalLock && !fSet.optionalVerticalLock && (
      <StyledCanvasVerticalLock
        side={fSet.sideOfHinge}
        outterPadding={outterPadding}
      >
        <Box width={getVerticalIconHeight(fSet)}>
          <Popover
            title={`арт.${defaultVerticalLock.article} ${defaultVerticalLock.name}`}
            content={<Button onClick={onDeleteButtonClick}>Видалить</Button>}
            trigger="click"
          >
            <StyledIconWrapper
              side={fSet.sideOfHinge}
              iconHeight={getVerticalIconHeight(fSet)}
            >
              {VerticalLockIcon && <VerticalLockIcon />}
            </StyledIconWrapper>
          </Popover>
        </Box>
      </StyledCanvasVerticalLock>
    )) ||
    (fSet.optionalVerticalLock && (
      <StyledCanvasVerticalLock
        side={fSet.sideOfHinge}
        iconHeight={getVerticalIconHeight(fSet)}
        outterPadding={outterPadding}
      >
        {fSet.optionalVerticalLock.map((article, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: getVerticalIconHeight(fSet),
              height: 40,
              top: 0,
              paddingTop: getOptionalVerticalOffset({ fSet, index })!,
            }}
          >
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
              <StyledIconWrapper
                side={fSet.sideOfHinge}
                iconHeight={getVerticalIconHeight(fSet)}
                currentIconSize={getCurrentIconSize({ fSet, article })}
              >
                <CanvasIconByArticle article={article} />
              </StyledIconWrapper>
            </Popover>
          </div>
        ))}
      </StyledCanvasVerticalLock>
    )) ||
    null
  );
};
