import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
  outterPadding: number;
};

export const StyledCanvasBottomEnd = styled.div<TProps>`
  position: absolute;
  bottom: ${props => `calc(${props.outterPadding}px - 25px)`};
  left: ${props =>
    props.side === 'left'
      ? `calc(100% - ${props.outterPadding}px + 20px)`
      : `calc(${props.outterPadding}px - 20px)`};
  transform-origin: left;
  transform: ${props =>
    props.side === 'right'
      ? 'scaleX(1) rotate(270deg)'
      : 'scaleX(-1) rotate(270deg)'};

  & svg {
    height: 15px;
  }
`;
