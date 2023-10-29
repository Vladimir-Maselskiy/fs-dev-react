import { IFSet } from '@/interfaces/interfaces';
import { drawWindowOutLine } from './drawWindowOutLine';
import { drawTypeOfOpening } from './drawTypeOfOpening';
import { drarVerticalLocks } from './drarVerticalLocks';

export type TArgs = {
  fSet: IFSet;
  ctx: CanvasRenderingContext2D;
};

export const px = 20;
export const py = 20;

const color = 'grey'; // Line color

export const drawCanvasContent = ({
  fSet,
  canvas,
}: {
  fSet: IFSet;
  canvas: HTMLCanvasElement | null;
}) => {
  const ctx = canvas?.getContext('2d');

  const updateCanvas = () => {
    if (ctx) {
      ctx.strokeStyle = color; // Set the stroke (border) color

      const rectConers = drawWindowOutLine({ fSet, ctx });
      drawTypeOfOpening({ fSet, ctx, rectConers });
      drarVerticalLocks({ fSet, ctx, rectConers });
    }
  };

  requestAnimationFrame(updateCanvas);

  if (ctx) {
    ctx.strokeStyle = color; // Set the stroke (border) color

    const rectConers = drawWindowOutLine({ fSet, ctx });
    drawTypeOfOpening({ fSet, ctx, rectConers });
  }
};
