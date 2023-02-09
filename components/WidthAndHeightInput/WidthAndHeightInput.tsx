import { onInputInInput } from '@/utils/onInputInInput';
import { onBlurInput } from '@/utils/onBlurInput';
import React from 'react';
import { Box } from '../Box/Box';
import {
  StyledInput,
  StyledLabel,
} from './WidthAndHeightInput.styled';

type TProps = {
  width: string;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
};

export const WidthAndHeightInput = ({
  width,
  setWidth,
  height,
  setHeight,
}: TProps) => {
  return (
    <Box>
      <StyledLabel>
        Ширина
        <StyledInput
          type="number"
          value={width}
          onInput={e => onInputInInput(e, 4, setWidth)}
          onBlur={e => onBlurInput(e)}
        />
      </StyledLabel>

      <StyledLabel>
        Висота
        <StyledInput
          type="number"
          value={height}
          onInput={e => onInputInInput(e, 4, setHeight)}
        />
      </StyledLabel>
    </Box>
  );
};
