import { IFSet } from '@/interfaces/interfaces';
import { drawWindowOutLine } from './drawWindowOutLine';
import { drawTypeOfOpening } from './drawTypeOfOpening';

export type TArgs = {
  fSet: IFSet;
  ctx: CanvasRenderingContext2D;
};

export const px = 70;
export const py = 100;

const color = 'grey'; // Line color

export const drawCanvasContent = ({
  fSet,
  canvas,
}: {
  fSet: IFSet;
  canvas: HTMLCanvasElement | null;
}) => {
  const ctx = canvas?.getContext('2d');
  if (ctx) {
    ctx.strokeStyle = color; // Set the stroke (border) color

    const rectConers = drawWindowOutLine({ fSet, ctx });
    drawTypeOfOpening({ fSet, ctx, rectConers });
  }
};
