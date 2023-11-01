import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
  iconWidth: string;
  outterPadding: number;
};

export const StyledCanvasGorizontalLock = styled.div<TProps>`
  position: absolute;
  top: calc(70% + 50px);
  left: ${props =>
    props.side === 'right'
      ? `calc(${props.outterPadding}px - 20px)`
      : `calc(${props.outterPadding}px + 20px)`};

  width: ${props => `calc(100% - ${props.outterPadding * 2}px)`};
  height: 40px;
  & svg {
    position: relative;
    left: ${props => (props.side === 'right' ? 0 : '100%')};
    transform: ${props =>
      props.side === 'right' ? 'translateX(0)' : 'translateX(-100%)'};
    width: 100%;
    height: 100%;
  }
  & svg:hover {
    cursor: pointer;
    fill: red;
  }
`;
