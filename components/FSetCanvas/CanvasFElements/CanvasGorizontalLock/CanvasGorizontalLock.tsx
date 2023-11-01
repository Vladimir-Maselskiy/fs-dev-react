import React from 'react';
import { StyledCanvasGorizontalLock } from './CanvasGorizontalLock.styled';
import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';
import { getGorizontalLocks } from '@/utils/maco/getGorizontalLocks';
import { getGorizontalLocksRC } from '@/utils/maco/rc/getGorizontalLocksRC';
import Icon211924WR from '../../../../public/articlesSVG/211924w-r.svg';
import Icon211924WL from '../../../../public/articlesSVG/211924w-l.svg';
import { Box } from '@/components/Box/Box';

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
  const [defaultGorizontalLock] = fSet.isAntiBreakingOpen
    ? getGorizontalLocksRC(fSet)
    : getGorizontalLocks(fSet);

  const getDafaultGoriontalLockIcon = (
    fSet: IFSet
  ): React.JSX.Element | null => {
    if (
      (defaultGorizontalLock.article === '211924' ||
        defaultGorizontalLock.article === '228398') &&
      fSet.sideOfHinge === 'right'
    )
      return <Icon211924WR />;
    if (
      (defaultGorizontalLock.article === '211924' ||
        defaultGorizontalLock.article === '228398') &&
      fSet.sideOfHinge === 'left'
    )
      return <Icon211924WL />;

    return null;
  };

  const getIconWidth = (fSet: IFSet) => {
    return '50%';
  };

  return (
    (fSet.typeOfOpening !== 'type-3' &&
      !fSet.optionalGorizontalLock &&
      defaultGorizontalLock && (
        <StyledCanvasGorizontalLock
          side={fSet.sideOfHinge}
          iconWidth={getIconWidth(fSet)}
          outterPadding={outterPadding}
        >
          {getDafaultGoriontalLockIcon(fSet)}
        </StyledCanvasGorizontalLock>
      )) ||
    null
  );
};
