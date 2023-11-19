import { TArgs } from './drawCanvasContent';

export const drawTypeOfOpening = ({
  fSet,
  ctx,
  rectConers,
}: TArgs & { rectConers: number[] }) => {
  ctx.beginPath();
  const lineWidth = 1; // Line width (border thickness)

  ctx.lineWidth = lineWidth; // Set the line width
  const { typeOfOpening, sideOfHinge } = fSet;
  const [topLeftX, topLeftY, bottomRightX, bottomRightY] = rectConers;

  if (typeOfOpening !== 'type-3') {
    if (sideOfHinge === 'right') {
      ctx.moveTo(bottomRightX, topLeftY);
      ctx.lineTo(topLeftX, (bottomRightY + topLeftY) / 2);
      ctx.lineTo(bottomRightX, bottomRightY);
      ctx.stroke();
      ctx.closePath();
    }
    if (sideOfHinge === 'left') {
      ctx.moveTo(topLeftX, topLeftY);
      ctx.lineTo(bottomRightX, (bottomRightY + topLeftY) / 2);
      ctx.lineTo(topLeftX, bottomRightY);
      ctx.stroke();
      ctx.closePath();
    }
  }
  if (
    typeOfOpening === 'type-1' ||
    typeOfOpening === 'type-3' ||
    typeOfOpening === 'type-4'
  ) {
    ctx.moveTo(topLeftX, bottomRightY);
    ctx.lineTo((topLeftX + bottomRightX) / 2, topLeftY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.stroke();
  }
};
