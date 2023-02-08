import { onChangeCounterByInput } from '@/utils/onChangeCounterByInput';
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
} : TProps) => {
  return (
    <Box>
      <StyledLabel>
        Ширина
        <StyledInput
          type="number"
          value={width}
          onChange={e =>
            onChangeCounterByInput(e, 4, setWidth)
          }
        />
      </StyledLabel>

      <StyledLabel>
        Висота
        <StyledInput
          type="number"
          value={height}
          onChange={e =>
            onChangeCounterByInput(e, 4, setHeight)
          }
        />
      </StyledLabel>
    </Box>
  );
};
