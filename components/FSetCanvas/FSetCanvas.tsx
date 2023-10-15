import { useFSetsContext } from '@/context/state';
import { IFSet } from '@/interfaces/interfaces';
import React, { useRef, useEffect } from 'react';
import { StyledCanvas } from './FSetCanvas.styled';
import { typeOfOpeningSelectOpions } from '@/const';
import { getTypeOfOpeningLabel } from '@/utils/data-utils/getTypeOfOpeningLabel';
import { drawCanvasContent } from '@/utils/canvas/drawCanvasContent';

type TProps = {
  fSet: IFSet;
};

export const FSetCanvas = ({ fSet }: TProps) => {
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
      <StyledCanvas ref={ref} />
    </>
  );
};
