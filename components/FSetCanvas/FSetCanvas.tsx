import { IFSet } from '@/interfaces/interfaces';
import React, { useRef, useState, useEffect } from 'react';
import { StyledCanvas, StyledCanvasWrapper } from './FSetCanvas.styled';
import { getTypeOfOpeningLabel } from '@/utils/data-utils/getTypeOfOpeningLabel';
import { drawCanvasContent } from '@/utils/canvas/drawCanvasContent';
import { Box } from '../Box/Box';
import { CanvasGorizontalLock } from './CanvasFElements/CanvasGorizontalLock/CanvasGorizontalLock';
import { CanvasVerticalLock } from './CanvasFElements/CanvasVerticalLock/CanvasVerticalLock';
import { CanvasShear } from './CanvasFElements/CanvasShear/CanvasShear';
import { CanvasFElementsList } from './CanvasFElements/CanvasFElementsList/CanvasFElementsList';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FSetCanvas = ({
  fSet,
  setFSet,
  isListOpen,
  setIsListOpen,
}: TProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const px = 20;
  const py = 20;
  const outterPaddingK = 3.2;
  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    drawCanvasContent({ fSet, canvas, px, py });
  }, []);

  return (
    <>
      <div>{`ширина: ${fSet.width}`}</div>
      <div>{`висота: ${fSet.height}`}</div>
      <div>{`тип відкривання: ${getTypeOfOpeningLabel(
        fSet.typeOfOpening
      )}`}</div>
      <Box
        position="relative"
        overflowX="hidden"
        border="2px solid gray"
        mt={20}
      >
        <StyledCanvasWrapper style={{ padding: outterPaddingK * px }}>
          <StyledCanvas ref={ref} />
          <CanvasShear
            fSet={fSet}
            setFSet={setFSet}
            outterPadding={px * outterPaddingK}
            setIsListOpen={setIsListOpen}
          />
          <CanvasGorizontalLock
            fSet={fSet}
            setFSet={setFSet}
            outterPadding={px * outterPaddingK}
          />
          <CanvasVerticalLock
            fSet={fSet}
            setFSet={setFSet}
            outterPadding={px * outterPaddingK}
            setIsListOpen={setIsListOpen}
          />
        </StyledCanvasWrapper>
        <CanvasFElementsList
          isListOpen={isListOpen}
          setIsListOpen={setIsListOpen}
          setFSet={setFSet}
        />
      </Box>
    </>
  );
};
