import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
  iconWidth: string;
  outterPadding: number;
};

export const StyledCanvasShear = styled.div<TProps>`
  position: absolute;
  top: ${props => `calc(${props.outterPadding}px - 30px)`};
  left: ${props =>
    props.side === 'right'
      ? `calc(100% - ${props.outterPadding}px)`
      : `calc(${props.outterPadding}px - 25px)`};
  transform: ${props =>
    props.side === 'right'
      ? 'translateX(calc(-100% + 20px))'
      : 'translateX(0%)'};
  & svg {
    height: 15px;
    transform: ${props => (props.side === 'right' ? '' : 'scaleX(-1);')};
  }

  & svg:hover {
    cursor: pointer;
    fill: red;
  }
`;
