import React from 'react';
import {
  StyledCanvasVerticalLock,
  StyledIcon211924W,
} from './CanvasVerticalLock.styled';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
};

export const CanvasVerticalLock = ({ fSet, setFSet }: TProps) => {
  const onClick = () => {
    console.log('click');
  };

  return (
    <StyledCanvasVerticalLock>
      <StyledIcon211924W onClick={onClick} />
    </StyledCanvasVerticalLock>
  );
};
