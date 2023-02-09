import { onInputInInput } from '@/utils/handlers/onInputInInput';
import { onBlurInput } from '@/utils/handlers/onBlurInput';
import React from 'react';
import { Box } from '../Box/Box';
import {
  StyledInput,
  StyledLabel,
} from './WidthAndHeightInput.styled';
import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  width: string;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  fSet: IFSet;
};

export const WidthAndHeightInput = ({
  width,
  setWidth,
  height,
  setHeight,
  fSet,
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();

  return (
    <Box>
      <StyledLabel>
        Ширина
        <StyledInput
          type="number"
          value={width}
          name="width"
          onInput={e => onInputInInput(e, 4, setWidth)}
          onBlur={e => onBlurInput(e, fSet, setFSetsArray)}
        />
      </StyledLabel>

      <StyledLabel>
        Висота
        <StyledInput
          type="number"
          value={height}
          name="height"
          onInput={e => onInputInInput(e, 4, setHeight)}
          onBlur={e => onBlurInput(e, fSet, setFSetsArray)}
        />
      </StyledLabel>
    </Box>
  );
};
