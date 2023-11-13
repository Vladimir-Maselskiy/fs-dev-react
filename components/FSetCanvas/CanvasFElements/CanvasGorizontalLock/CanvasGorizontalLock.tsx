import React, { useState } from 'react';
import {
  StyledCanvasGorizontalLock,
  StyledIconWrapper,
} from './CanvasGorizontalLock.styled';
import { IFSet, IMacoLocks } from '@/interfaces/interfaces';
import { getDafaultGoriontalLockIcon } from '@/utils/canvas/getDafaultGoriontalLockIcon';
import { getDefaultGorizontalLock } from '@/utils/canvas/getDefaultGorizontalLock';
import { getGorizonalIconWidth } from '@/utils/canvas/getGorizonalIconWidth';
import { Button, Popover } from 'antd';
import { TListFilter } from '../../FSetCanvas';
import { Box } from '@/components/Box/Box';
import { getItemNameByArticle } from '@/utils/maco/getItemNameByArticle';
import { getLockItemMacoByArticle } from '@/utils/canvas/getLockItemMacoByArticle';
import { getCurrentIconSize } from '@/utils/canvas/getCurrentIconSize';
import { CanvasIconByArticle } from '../CanvasIconByArticle/CanvasIconByArticle';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  outterPadding: number;
  setListFilter: React.Dispatch<React.SetStateAction<TListFilter>>;
  filteredData: IMacoLocks[];
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CanvasGorizontalLock = ({
  fSet,
  setFSet,
  outterPadding,
  setListFilter,
  filteredData,
  setIsListOpen,
}: TProps) => {
  const [otpionalCurrentIndex, setOtpionalCurrentIndex] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const defaultGorizontalLock = getDefaultGorizontalLock(fSet);
  const GorizontalLockIcon = getDafaultGoriontalLockIcon(fSet);

  const onGorizontalLockClick = () => {
    setListFilter(prev => ({ ...prev, side: 'vertical' }));
  };

  const onDeleteButtonClick = () => {
    setFSet(prev => ({ ...prev, optionalGorizontalLock: [] }));
  };

  const onExtendButtonClick = () => {
    setIsListOpen(true);
    setIsPopoverOpen(false);
  };

  return (
    (!fSet.optionalGorizontalLock && defaultGorizontalLock && (
      <StyledCanvasGorizontalLock
        side={fSet.sideOfHinge}
        iconWidth={getGorizonalIconWidth(fSet)}
        outterPadding={outterPadding}
        onClick={onGorizontalLockClick}
      >
        <Popover
          title={`арт.${defaultGorizontalLock.article} ${defaultGorizontalLock.name}`}
          content={<Button onClick={onDeleteButtonClick}>Видалить</Button>}
          trigger="click"
        >
          <GorizontalLockIcon />
        </Popover>
      </StyledCanvasGorizontalLock>
    )) ||
    (fSet.optionalVerticalLock && (
      <StyledCanvasGorizontalLock
        side={fSet.sideOfHinge}
        iconWidth={getGorizonalIconWidth(fSet)}
        outterPadding={outterPadding}
        onClick={onGorizontalLockClick}
      >
        {fSet.optionalGorizontalLock!.map((article, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: getGorizonalIconWidth(fSet),
              height: 40,
              top: 0,
              // paddingTop: getOptionalVerticalOffset({ fSet, index })!,
              zIndex: fSet.optionalVerticalLock?.length! - index,
            }}
          >
            <Popover
              title={`арт.${article} ${getItemNameByArticle(article)}`}
              content={
                <Box>
                  {otpionalCurrentIndex ===
                    fSet.optionalGorizontalLock?.length! - 1 && (
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
                iconWidth={getGorizonalIconWidth(fSet)}
                currentIconSize={getCurrentIconSize({ fSet, article })}
              >
                <CanvasIconByArticle article={article} />
              </StyledIconWrapper>
            </Popover>
          </div>
        ))}
      </StyledCanvasGorizontalLock>
    )) ||
    null
  );
};
