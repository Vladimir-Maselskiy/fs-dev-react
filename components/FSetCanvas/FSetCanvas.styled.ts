import styled from 'styled-components';

type TProps = {
  open: boolean;
};

type TCanvasProps = {
  windowWidth: number;
};

export const StyledCanvasLayout = styled.div<TProps>`
  position: absolute;
  left: 0;
  background-color: var(--first-background-color);
  transform: ${props =>
    props.open ? 'translateX(0)' : 'translateX(calc(-100% - 34px))'};
  transition: transform 0.8s ease-in-out;
  overflow-x: hidden;
`;
export const StyledCanvas = styled.canvas<TCanvasProps>`
  aspect-ratio: 1/1;
  border: 2px solid var(--accent-color);
  border-radius: 6px;
  width: ${prop => `${Math.min(prop.windowWidth / 2, 320)}px`};
`;
export const StyledCanvasWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  border: 2px solid gray;
  border-radius: 6px;
  aspect-ratio: 1/1;

  & svg:hover {
    cursor: pointer;
    fill: red;
  }
`;
