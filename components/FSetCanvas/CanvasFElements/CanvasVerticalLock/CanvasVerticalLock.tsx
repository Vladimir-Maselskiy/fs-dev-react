import React, { useState } from 'react';
import {
  StyledCanvasVerticalLock,
  StyledIconWrapper,
} from './CanvasVerticalLock.styled';
import { IFSet, IMacoLocks } from '@/interfaces/interfaces';
import { getVerticalIconHeight } from '@/utils/canvas/getVerticalIconHeight';
import { getVerticalLockIcon } from '@/utils/canvas/getDafaultVerticalLockIcon';
import { Button, Popover } from 'antd';
import { getDefaultVerticalLock } from '@/utils/canvas/getDefaultVerticalLock';
import { getItemNameByArticle } from '@/utils/maco/getItemNameByArticle';
import { CanvasIconByArticle } from '../CanvasIconByArticle/CanvasIconByArticle';
import { Box } from '@/components/Box/Box';
import { getCurrentIconSize } from '@/utils/canvas/getCurrentIconSize';
import { getOptionalVerticalOffset } from '@/utils/canvas/getOptionalVerticalOffset';
import { getLockItemMacoByArticle } from '@/utils/canvas/getLockItemMacoByArticle';
import { TListFilter } from '../../FSetCanvas';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  outterPadding: number;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListFilter: React.Dispatch<React.SetStateAction<TListFilter>>;
  filteredData: IMacoLocks[];
};

export const CanvasVerticalLock = ({
  fSet,
  setFSet,
  outterPadding,
  setIsListOpen,
  setListFilter,
  filteredData,
}: TProps) => {
  const defaultVerticalLock = getDefaultVerticalLock(fSet);
  const VerticalLockIcon = getVerticalLockIcon(fSet);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [otpionalCurrentIndex, setOtpionalCurrentIndex] = useState(0);

  const changeSideOfFilterByClick = (
    side: 'vertical' | 'gorizontal' | null
  ) => {
    setListFilter(prev => ({ ...prev, side }));
  };

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
    setIsPopoverOpen(false);
  };

  const onExtendButtonClick = () => {
    setIsListOpen(true);
    setIsPopoverOpen(false);
  };

  return (
    (defaultVerticalLock && !fSet.optionalVerticalLock && (
      <StyledCanvasVerticalLock
        side={fSet.sideOfHinge}
        outterPadding={outterPadding}
      >
        <Box
          width={getVerticalIconHeight(fSet)}
          onClick={() => changeSideOfFilterByClick('vertical')}
        >
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
        onClick={() => changeSideOfFilterByClick('vertical')}
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
              zIndex: fSet.optionalVerticalLock?.length! - index,
            }}
          >
            <Popover
              title={`арт.${article} ${getItemNameByArticle(article)}`}
              content={
                <Box>
                  {otpionalCurrentIndex ===
                    fSet.optionalVerticalLock?.length! - 1 && (
                    <>
                      <Button onClick={onDeleteButtonClick}>Видалити</Button>
                      {getLockItemMacoByArticle(article)?.endConnection &&
                        filteredData.length > 0 && (
                          <Button
                            onClick={onExtendButtonClick}
                            style={{ marginLeft: 20 }}
                          >
                            Приєднати ще
                          </Button>
                        )}
                    </>
                  )}
                </Box>
              }
              trigger="click"
              open={isPopoverOpen && index === otpionalCurrentIndex}
              onOpenChange={newOpen => {
                setIsPopoverOpen(newOpen);
                setOtpionalCurrentIndex(index);
              }}
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
