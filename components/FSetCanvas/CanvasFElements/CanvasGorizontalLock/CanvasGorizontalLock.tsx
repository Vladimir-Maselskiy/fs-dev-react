import React from 'react';
import { StyledCanvasGorizontalLock } from './CanvasGorizontalLock.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getDafaultGoriontalLockIcon } from '@/utils/canvas/getDafaultGoriontalLockIcon';
import { getDefaultGorizontalLock } from '@/utils/canvas/getDefaultGorizontalLock';
import { getGorizonalIconWidth } from '@/utils/canvas/getGorizonalIconWidth';
import { Button, Popover } from 'antd';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  outterPadding: number;
};

export const CanvasGorizontalLock = ({
  fSet,
  setFSet,
  outterPadding,
}: TProps) => {
  const defaultGorizontalLock = getDefaultGorizontalLock(fSet);
  const GorizontalLockIcon = getDafaultGoriontalLockIcon(fSet);

  const onDeleteButtonClick = () => {
    setFSet(prev => ({ ...prev, optionalGorizontalLock: [] }));
  };

  return (
    (fSet.typeOfOpening !== 'type-3' &&
      !fSet.optionalGorizontalLock &&
      defaultGorizontalLock &&
      !fSet.optionalGorizontalLock && (
        <StyledCanvasGorizontalLock
          side={fSet.sideOfHinge}
          iconWidth={getGorizonalIconWidth(fSet)}
          outterPadding={outterPadding}
        >
          <Popover
            title={`арт.${defaultGorizontalLock.article} ${defaultGorizontalLock.name}`}
            content={<Button onClick={onDeleteButtonClick}>Видалить</Button>}
          >
            <GorizontalLockIcon />
          </Popover>
        </StyledCanvasGorizontalLock>
      )) ||
    null
  );
};
