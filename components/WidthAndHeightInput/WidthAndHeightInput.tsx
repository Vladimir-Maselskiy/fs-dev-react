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
  id: string;
};

export const WidthAndHeightInput = ({
  width,
  setWidth,
  height,
  setHeight,
  id,
}: TProps) => {
  return (
    <Box>
      <StyledLabel>
        Ширина
        <StyledInput
          type="number"
          value={width}
          onInput={e => onInputInInput(e, 4, setWidth)}
          onBlur={e => onBlurInput(e, id)}
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
