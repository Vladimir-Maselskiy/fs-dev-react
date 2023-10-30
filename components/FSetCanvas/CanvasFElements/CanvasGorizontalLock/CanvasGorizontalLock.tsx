import React from 'react';
import {
  StyledCanvasGorizontalLock,
  StyledIcon,
} from './CanvasGorizontalLock.styled';
import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
};

export const CanvasGorizontalLock = ({ fSet, setFSet }: TProps) => {
  const {} = useFSetsContext();
  return (
    fSet.typeOfOpening !== 'type-3' && (
      <StyledCanvasGorizontalLock>
        <StyledIcon side={fSet.sideOfHinge} />
      </StyledCanvasGorizontalLock>
    )
  );
};
