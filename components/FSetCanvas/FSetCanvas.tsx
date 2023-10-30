import { IFSet } from '@/interfaces/interfaces';
import React, { useRef, useEffect } from 'react';
import { StyledCanvas } from './FSetCanvas.styled';
import { getTypeOfOpeningLabel } from '@/utils/data-utils/getTypeOfOpeningLabel';
import { drawCanvasContent } from '@/utils/canvas/drawCanvasContent';
import { Box } from '../Box/Box';
import { CanvasGorizontalLock } from './CanvasFElements/CanvasGorizontalLock/CanvasGorizontalLock';
import { CanvasVerticalLock } from './CanvasFElements/CanvasVerticalLock/CanvasVerticalLock';

type TProps = {
  fSet: IFSet;
  setFSet: React.Dispatch<React.SetStateAction<IFSet>>;
};

export const FSetCanvas = ({ fSet, setFSet }: TProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    drawCanvasContent({ fSet, canvas });
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
        display="flex"
        justifyContent="center"
        width="100%"
        mt={40}
        p={40}
        border="2px solid gray"
      >
        <StyledCanvas ref={ref} />
        <CanvasGorizontalLock fSet={fSet} setFSet={setFSet} />
        <CanvasVerticalLock fSet={fSet} setFSet={setFSet} />
      </Box>
    </>
  );
};
