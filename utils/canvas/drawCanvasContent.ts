import { IFSet } from '@/interfaces/interfaces';
import { drawWindowOutLine } from './drawWindowOutLine';
import { drawTypeOfOpening } from './drawTypeOfOpening';
import { drarVerticalLocks } from './drarVerticalLocks';
import { drawVerticalLockPoints } from './drawVerticalLockPoints';
import { drawGorizontalLockPoints } from './drawGorizontalLockPoints';

export type TArgs = {
  fSet: IFSet;
  ctx: CanvasRenderingContext2D;
  px?: number;
  py?: number;
};

const color = 'grey'; // Line color

export const drawCanvasContent = ({
  fSet,
  canvas,
  px,
  py,
}: {
  fSet: IFSet;
  canvas: HTMLCanvasElement | null;
  px: number;
  py: number;
}) => {
  const ctx = canvas?.getContext('2d');

  const updateCanvas = () => {
    if (ctx) {
      ctx.strokeStyle = color; // Set the stroke (border) color

      const rectConers = drawWindowOutLine({ fSet, ctx, px });
      drawTypeOfOpening({ fSet, ctx, rectConers });
      fSet.brand === 'maco' &&
        fSet.typeOfOpening === 'type-1' &&
        drawVerticalLockPoints({ fSet, ctx, rectConers });
      fSet.brand === 'maco' &&
        fSet.typeOfOpening === 'type-1' &&
        drawGorizontalLockPoints({ fSet, ctx, rectConers });
    }
  };

  requestAnimationFrame(updateCanvas);

  if (ctx) {
    ctx.strokeStyle = color; // Set the stroke (border) color

    const rectConers = drawWindowOutLine({ fSet, ctx });
  }
};
