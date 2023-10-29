import { TArgs, px } from './drawCanvasContent';

export const drarVerticalLocks = ({
  fSet,
  ctx,
  rectConers,
}: TArgs & { rectConers: number[] }) => {
  console.log('fSEt', fSet);
  const lineWidth = 1; // Line width (border thickness)

  ctx.lineWidth = lineWidth; // Set the line width
  const { typeOfOpening, sideOfHinge } = fSet;
  const [topLeftX, topLeftY, bottomRightX, bottomRightY] = rectConers;
  if (typeOfOpening !== 'type-3') {
    if (sideOfHinge === 'right') {
      ctx.moveTo(bottomRightX + topLeftX, topLeftY);
      ctx.lineTo(topLeftX, bottomRightY / 2 + topLeftY);
      ctx.lineTo(bottomRightX + topLeftX, topLeftY + bottomRightY);
      ctx.stroke();
      ctx.closePath();
    }
    if (sideOfHinge === 'left') {
      ctx.moveTo(topLeftX, topLeftY);
      ctx.lineTo(topLeftX + bottomRightX, bottomRightY / 2 + topLeftY);
      ctx.lineTo(topLeftX, topLeftY + bottomRightY);
      ctx.stroke();
      ctx.closePath();
    }
  }
  if (typeOfOpening === 'type-1' || 'type-3' || 'type-4') {
    ctx.moveTo(topLeftX, topLeftY + bottomRightY);
    ctx.lineTo(topLeftX + bottomRightX / 2, topLeftY);
    ctx.lineTo(bottomRightX + topLeftX, topLeftY + bottomRightY);
    ctx.stroke();
  }
};
