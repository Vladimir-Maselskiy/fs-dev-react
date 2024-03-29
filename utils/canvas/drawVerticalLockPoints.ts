import { TArgs } from './drawCanvasContent';
import { getCanvasLocksPoint } from './getCanvasLocksPoint';

export const drawVerticalLockPoints = ({
  fSet,
  ctx,
  rectConers,
}: TArgs & { rectConers: number[] }) => {
  ctx.beginPath();
  const lineWidth = 1; // Line width (border thickness)
  ctx.lineWidth = lineWidth; // Set the line width
  ctx.strokeStyle = 'red';

  const { typeOfOpening, sideOfHinge } = fSet;
  const [topLeftX, topLeftY, bottomRightX, bottomRightY] = rectConers;
  const locksPoints = getCanvasLocksPoint({ fSet, side: 'vertical' });
  const currentScale = (bottomRightY - topLeftY) / fSet.height!;

  if (typeOfOpening !== 'type-3') {
    if (sideOfHinge === 'right') {
      locksPoints.forEach(lockPoint => {
        ctx.beginPath();
        ctx.arc(
          bottomRightX,
          topLeftY + lockPoint * currentScale,
          5,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath();
      });
    }
    if (sideOfHinge === 'left') {
      locksPoints.forEach(lockPoint => {
        ctx.beginPath();
        ctx.arc(
          topLeftX,
          topLeftY + lockPoint * currentScale,
          5,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath();
      });
    }
  }

  ctx.closePath();
};
