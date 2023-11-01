import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
};

export const StyledCanvasVerticalLock = styled.div<TProps>`
  position: absolute;
  top: calc(20px);
  left: ${props =>
    props.side === 'right' ? 'calc(70% + 20px)' : 'calc(15%) '};
  /* height: 105%; */
  & svg:hover {
    cursor: pointer;
    fill: red;
  }
`;
