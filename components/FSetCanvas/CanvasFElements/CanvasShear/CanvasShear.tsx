import React, { useState, useEffect } from 'react';
import { StyledCanvasShear } from './CanvasShear.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getGorizonalIconWidth } from '@/utils/canvas/getGorizonalIconWidth';
import { Button, Popover } from 'antd';
import { getShear } from '@/utils/maco/getShear';
import { getShearIcon } from '@/utils/canvas/getShearIcon';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  outterPadding: number;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CanvasShear = ({
  fSet,
  setFSet,
  outterPadding,
  setIsListOpen,
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

  return (
    (fSet.typeOfOpening !== 'type-3' && (
      <StyledCanvasShear
        side={fSet.sideOfHinge}
        iconWidth={getGorizonalIconWidth(fSet)}
        outterPadding={outterPadding}
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
