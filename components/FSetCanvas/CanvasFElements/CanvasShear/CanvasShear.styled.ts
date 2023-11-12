import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
  iconWidth: string;
  outterPadding: number;
};

export const StyledCanvasShear = styled.div<TProps>`
  position: absolute;
  top: ${props => `calc(${props.outterPadding}px - 25px)`};
  left: ${props =>
    props.side === 'right'
      ? `calc(100% - ${props.outterPadding}px)`
      : `calc(${props.outterPadding}px - 25px)`};
  transform: ${props =>
    props.side === 'right'
      ? 'translateX(calc(-100% + 20px))'
      : 'translateX(0%)'};

  width: ${props => `calc(${props.iconWidth} - ${props.outterPadding * 2}px)`};

  & svg {
    height: 15px;
    width: 100%;
    transform: ${props => (props.side === 'right' ? '' : 'scaleX(-1);')};
  }
`;
