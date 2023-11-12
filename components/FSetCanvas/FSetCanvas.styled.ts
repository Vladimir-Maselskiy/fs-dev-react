import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
  aspect-ratio: 1/1;
  border: 2px solid red;
`;
export const StyledCanvasWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  & svg:hover {
    cursor: pointer;
    fill: red;
  }
`;
