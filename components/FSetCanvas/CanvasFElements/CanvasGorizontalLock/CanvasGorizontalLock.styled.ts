import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
  iconWidth?: string;
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
`;

export const StyledWrapperForDefaultIcon = styled.div<TProps>`
  position: absolute;
  height: 100%;
  ${props => (props.side === 'left' ? 'right: 0px' : 'left : 0px')};
  transform: ${props => (props.side === 'right' ? 'scaleX(1)' : 'scaleX(-1)')};
`;

export const StyledIconWrapper = styled.div<TProps>`
  position: absolute;
  transform-origin: top left;
  transform: ${props =>
    props.side === 'right' ? 'scaleX(1)' : 'scaleX(-1) translateX(-100%)'};
  width: ${props => props.currentIconSize};
  height: 40px;
  ${props => (props.side === 'left' ? 'right: 0px' : 'left : 0px')};
  & svg {
    width: 100%;
  }
`;
