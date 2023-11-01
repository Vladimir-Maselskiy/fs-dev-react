import React from 'react';
import { StyledCanvasVerticalLock } from './CanvasVerticalLock.styled';
import { IFSet } from '@/interfaces/interfaces';
import { getVerticalLocks } from '@/utils/maco/getVerticalLocks';
import { getVerticalLocksRC } from '@/utils/maco/rc/getVerticalLocksRC';
import Icon211924HR from '../../../../public/articlesSVG/211924h-r.svg';
import Icon211924HL from '../../../../public/articlesSVG/211924h-l.svg';

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
  const [defaultGorizontalLock] = fSet.isAntiBreakingOpen
    ? getVerticalLocksRC(fSet)
    : getVerticalLocks(fSet);

  const getIconHeight = (fSet: IFSet) => {
    return '50%';
  };

  const getDafaultVerticalLockIcon = (
    fSet: IFSet
  ): React.JSX.Element | null => {
    if (
      (defaultGorizontalLock.article === '228398' ||
        defaultGorizontalLock.article === '211924' ||
        defaultGorizontalLock.article === '211925') &&
      fSet.sideOfHinge === 'right'
    )
      return <Icon211924HR />;
    if (
      (defaultGorizontalLock.article === '228398' ||
        defaultGorizontalLock.article === '211924' ||
        defaultGorizontalLock.article === '211925') &&
      fSet.sideOfHinge === 'left'
    )
      return <Icon211924HL />;

    return null;
  };

  return (
    <StyledCanvasVerticalLock
      side={fSet.sideOfHinge}
      iconHeight={getIconHeight(fSet)}
      outterPadding={outterPadding}
    >
      {getDafaultVerticalLockIcon(fSet)}
    </StyledCanvasVerticalLock>
  );
};
