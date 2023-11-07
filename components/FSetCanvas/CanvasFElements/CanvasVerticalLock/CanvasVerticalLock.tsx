import React from 'react';
import { StyledCanvasVerticalLock } from './CanvasVerticalLock.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getVerticalIconHeight } from '@/utils/canvas/getVerticalIconHeight';
import { getDafaultVerticalLockIcon } from '@/utils/canvas/getDafaultVerticalLockIcon';
import { Button, Popover } from 'antd';
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
  const defaultVerticalLock = getDefaultVerticalLock(fSet);
  const VerticalLockIcon = getDafaultVerticalLockIcon(fSet);

  const onDeleteButtonClick = () => {
    setFSet(prev => ({ ...prev, optionalVerticalLock: [] }));
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
    null
  );
};
