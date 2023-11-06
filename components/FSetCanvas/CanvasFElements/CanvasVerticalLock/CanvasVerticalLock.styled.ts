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
      : `calc(${props.outterPadding}px - 15px)`};
  height: ${props => `calc(100% - ${props.outterPadding * 2}px)`};

  & svg {
    height: ${props => props.iconHeight};
  }

  & svg:hover {
    cursor: pointer;
    fill: red;
  }
`;
