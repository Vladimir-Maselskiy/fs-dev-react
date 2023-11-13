import React, { useState, useEffect } from 'react';
import { StyledCanvasShear } from './CanvasShear.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getGorizonalIconWidth } from '@/utils/canvas/getGorizonalIconWidth';
import { Button, Popover } from 'antd';
import { getShear } from '@/utils/maco/getShear';
import { getShearIcon } from '@/utils/canvas/getShearIcon';
import { getIconScaleByArticle } from '@/utils/canvas/getIconScaleByArticle';
import { TListFilter } from '../../FSetCanvas';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  outterPadding: number;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListFilter: React.Dispatch<React.SetStateAction<TListFilter>>;
};

export const CanvasShear = ({
  fSet,
  setFSet,
  outterPadding,
  setIsListOpen,
  setListFilter,
}: TProps) => {
  const [isExtended, setIsExtended] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (fSet.optionalVerticalLock && fSet.optionalVerticalLock.length === 0) {
      setIsExtended(true);
    } else setIsExtended(false);
  }, [fSet.optionalVerticalLock, fSet.optionalVerticalLock?.length]);

  const [currentShear] = getShear(fSet);
  const ShearIcon = getShearIcon(fSet);

  const onExtendButtonClick = () => {
    setIsPopoverOpen(false);
    setIsListOpen(true);
    setFSet(prev => ({ ...prev, optionalVerticalLock: [] }));
  };

  const changeSideOfFilterByClick = (
    side: 'vertical' | 'gorizontal' | null
  ) => {
    setListFilter(prev => ({ ...prev, side }));
  };

  return (
    (fSet.typeOfOpening !== 'type-3' && (
      <StyledCanvasShear
        side={fSet.sideOfHinge}
        iconWidth={getIconScaleByArticle({
          item: currentShear,
          sideLength: fSet.width!,
        })}
        outterPadding={outterPadding}
        onClick={() => changeSideOfFilterByClick('vertical')}
      >
        <Popover
          title={`арт.${currentShear.article} ${currentShear.name}`}
          content={
            <Button disabled={!isExtended} onClick={onExtendButtonClick}>
              Приєднати ще
            </Button>
          }
          trigger="click"
          open={isPopoverOpen}
          onOpenChange={newOpen => {
            setIsPopoverOpen(newOpen);
          }}
        >
          {ShearIcon && <ShearIcon />}
        </Popover>
      </StyledCanvasShear>
    )) ||
    null
  );
};
