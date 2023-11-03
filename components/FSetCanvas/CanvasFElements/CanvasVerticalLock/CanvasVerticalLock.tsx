import React from 'react';
import { StyledCanvasVerticalLock } from './CanvasVerticalLock.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getVerticalIconHeight } from '@/utils/canvas/getVerticalIconHeight';
import { getDafaultVerticalLockIcon } from '@/utils/canvas/getDafaultVerticalLockIcon';
import { Popover } from 'antd';
import { getDefaultVerticalLock } from '@/utils/canvas/getDefaultVerticalLock';

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
  const defaultVerticalLock = getDefaultVerticalLock(fSet);
  const VerticalLockIcon = getDafaultVerticalLockIcon(fSet);

  return (
    defaultVerticalLock && (
      <StyledCanvasVerticalLock
        side={fSet.sideOfHinge}
        iconHeight={getVerticalIconHeight(fSet)}
        outterPadding={outterPadding}
      >
        <Popover
          // placement="topLeft"
          title={`арт.${defaultVerticalLock.article} ${defaultVerticalLock.name}`}
        >
          {VerticalLockIcon && <VerticalLockIcon />}
        </Popover>
      </StyledCanvasVerticalLock>
    )
  );
};
