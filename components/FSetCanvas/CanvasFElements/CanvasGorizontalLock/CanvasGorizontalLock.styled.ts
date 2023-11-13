import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
  iconWidth: string;
  outterPadding?: number;
  currentIconSize?: string;
};

export const StyledCanvasGorizontalLock = styled.div<TProps>`
  position: absolute;
  top: ${props => `calc(100% - ${props.outterPadding}px - 25px)`};
  left: ${props =>
    props.side === 'right'
      ? `calc(${props.outterPadding}px - 15px)`
      : `calc(${props.outterPadding}px + 15px)`};

  width: ${props => `calc(100% - ${props.outterPadding! * 2}px)`};
  height: 40px;
  & svg {
    position: relative;
    left: ${props => (props.side === 'right' ? 0 : '100%')};
    transform: ${props =>
      props.side === 'right'
        ? 'translateX(0)'
        : 'translateX(-100%) scaleX(-1)'};
    width: ${props => props.iconWidth};
    height: 100%;
  }
`;

export const StyledIconWrapper = styled.div<TProps>`
  transform-origin: top left;
  transform: ${props =>
    props.side === 'right'
      ? 'scaleX(-1) rotate(90deg)'
      : 'scaleX(1) rotate(90deg)'};
  width: ${props => props.currentIconSize};
  height: 40px;
  & svg {
    width: 100%;
  }
`;
