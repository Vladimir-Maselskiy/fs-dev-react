import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
  iconHeight: string;
  outterPadding: number;
};

export const StyledCanvasVerticalLock = styled.div<TProps>`
  position: absolute;
  top: ${props => `calc(${props.outterPadding}px - 10px)`};
  left: ${props =>
    props.side === 'right'
      ? `calc(100% - ${props.outterPadding}px - 25px)`
      : `calc(${props.outterPadding}px + 25px)`};
  width: ${props => `calc(100% - ${props.outterPadding * 2}px)`};
  height: 40px;
  & svg {
    transform-origin: top left;
    transform: ${props =>
      props.side === 'right'
        ? 'scaleX(-1) rotate(90deg)'
        : 'scaleX(1) rotate(90deg)'};
    width: ${props => props.iconHeight};
    height: 40px;
  }

  & svg:hover {
    cursor: pointer;
    fill: red;
  }
`;
