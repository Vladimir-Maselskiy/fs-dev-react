import { TArgs, px } from './drawCanvasContent';

export const drawWindowOutLine = ({ fSet, ctx }: TArgs) => {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const fSetWidth = fSet.width!;
  const fSetHeight = fSet.height!;

  const widthScale = (canvasWidth - 2 * px) / fSetWidth;
  const heightScale = (canvasHeight - 2 * px) / fSetHeight;
  const currentScale = Math.min(widthScale, heightScale);
  const currentWidth = fSetWidth * currentScale;
  const currentHeight = fSetHeight * currentScale;
  const currentXMargin = (canvasWidth - currentWidth) / 2;
  const currentYMargin = (canvasHeight - currentHeight) / 2;

  const lineWidth = 3; // Line width (border thickness)

  ctx.scale(1, 1);

  ctx.lineWidth = lineWidth; // Set the line width
  ctx.strokeRect(currentXMargin, currentYMargin, currentWidth, currentHeight); // Draw the scaled rectangle border
  return [currentXMargin, currentYMargin, currentWidth, currentHeight];
};
