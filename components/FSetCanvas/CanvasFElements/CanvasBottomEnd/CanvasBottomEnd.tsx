import React, { useState, useEffect } from 'react';
import { IFSet } from '@/interfaces/interfaces';
import { Button, Popover } from 'antd';
import { StyledCanvasBottomEnd } from './CanvasBottomEnd.styled';
import BottomEndIcon from '../../../../public/articlesSVG/212689.svg';
import { getBottomEndingForGetriebe } from '@/utils/maco/getBottomEndingForGetriebe';
import { TListFilter } from '../../FSetCanvas';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  outterPadding: number;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListFilter: React.Dispatch<React.SetStateAction<TListFilter>>;
};

export const CanvasBottomEnd = ({
  fSet,
  setFSet,
  outterPadding,
  setIsListOpen,
  setListFilter,
}: TProps) => {
  const [isExtended, setIsExtended] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (
      !fSet.optionalGorizontalLock ||
      fSet.optionalGorizontalLock.length === 0
    ) {
      setIsExtended(true);
    } else setIsExtended(false);
  }, [fSet.optionalGorizontalLock, fSet.optionalGorizontalLock?.length]);

  const [currentBottomEnd] = getBottomEndingForGetriebe(fSet);

  const onExtendButtonClick = () => {
    setIsPopoverOpen(false);
    setIsListOpen(true);
    setFSet(prev => ({ ...prev, optionalGorizontalLock: [] }));
  };

  const changeSideOfFilterByClick = (
    side: 'vertical' | 'gorizontal' | null
  ) => {
    console.log(' setListFilter(prev => ({ ...prev,  }))', side);
    setListFilter(prev => ({ ...prev, side }));
  };

  return (
    (fSet.typeOfOpening !== 'type-3' && (
      <StyledCanvasBottomEnd
        side={fSet.sideOfHinge}
        outterPadding={outterPadding}
        onClick={() => changeSideOfFilterByClick('gorizontal')}
      >
        <Popover
          title={`арт.${currentBottomEnd.article} ${currentBottomEnd.name}`}
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
          <BottomEndIcon />
        </Popover>
      </StyledCanvasBottomEnd>
    )) ||
    null
  );
};
