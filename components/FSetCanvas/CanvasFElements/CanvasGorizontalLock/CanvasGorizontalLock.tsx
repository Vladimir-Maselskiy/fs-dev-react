import React from 'react';
import {
  StyledCanvasGorizontalLock,
  StyledIcon211924W,
} from './CanvasGorizontalLock.styled';

export const CanvasGorizontalLock = () => {
  const onClick = () => {
    console.log('click');
  };

  return (
    <StyledCanvasGorizontalLock>
      <StyledIcon211924W onClick={onClick} />
    </StyledCanvasGorizontalLock>
  );
};
