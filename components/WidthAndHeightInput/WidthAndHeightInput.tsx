import { onInputInInput } from '@/utils/handlers/onInputInInput';
import { onBlurInput } from '@/utils/handlers/onBlurInput';
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '../Box/Box';
import {
  StyledInput,
  StyledLabel,
} from './WidthAndHeightInput.styled';
import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';
import { onKeyDownOnInput } from '@/utils/handlers/onKeyDownOnInput';

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

  const widthInputRef = useRef<HTMLInputElement>(null);
  const heihtInputRef = useRef<HTMLInputElement>(null);

  return (
    <Box>
      <StyledLabel>
        Ширина
        <StyledInput
          ref={widthInputRef}
          type="number"
          value={width}
          name="width"
          borderStyle={fSet.isWidthValid}
          onInput={e => onInputInInput(e, 4, setWidth)}
          onBlur={e => onBlurInput(e, fSet, setFSetsArray)}
          onKeyDown={e => {
            onKeyDownOnInput(
              e,
              widthInputRef,
              heihtInputRef,
              'width'
            );
          }}
        />
      </StyledLabel>

      <StyledLabel>
        Висота
        <StyledInput
          ref={heihtInputRef}
          type="number"
          value={height}
          name="height"
          borderStyle={fSet.isHeightValid}
          onInput={e => onInputInInput(e, 4, setHeight)}
          onBlur={e => onBlurInput(e, fSet, setFSetsArray)}
          onKeyDown={e => {
            onKeyDownOnInput(
              e,
              widthInputRef,
              heihtInputRef,
              'height'
            );
          }}
        />
      </StyledLabel>
    </Box>
  );
};
