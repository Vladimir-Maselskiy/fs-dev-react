import React from 'react';
import { StyledCanvasVerticalLock } from './CanvasVerticalLock.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getVerticalIconHeight } from '@/utils/canvas/getVerticalIconHeight';
import { getDafaultVerticalLockIcon } from '@/utils/canvas/getDafaultVerticalLockIcon';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  outterPadding: number;
};

export const CanvasVerticalLock = ({
  fSet,
  setFSet,
  outterPadding,
}: TProps) => {
  const getIconHeight = (fSet: IFSet) => {
    return '50%';
  };

  const VerticalLockIcon = getDafaultVerticalLockIcon(fSet);

  return (
    <StyledCanvasVerticalLock
      side={fSet.sideOfHinge}
      iconHeight={getVerticalIconHeight(fSet)}
      outterPadding={outterPadding}
    >
      {VerticalLockIcon && <VerticalLockIcon />}
    </StyledCanvasVerticalLock>
  );
};
