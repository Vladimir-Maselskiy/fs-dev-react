import styled from 'styled-components';

type TProps = {
  side: 'right' | 'left';
};

export const StyledCanvasGorizontalLock = styled.div<TProps>`
  position: absolute;
  top: calc(70% + 50px);
  left: ${props =>
    props.side === 'right' ? 'calc(30% - 60px)' : 'calc(70% + 30px) '};
  transform: ${props =>
    props.side === 'right' ? 'translateX(0)' : 'translateX(-100%)'};
  width: 35%;
`;
// export const StyledIcon = styled(Icon211924WR)`
//   &:hover {
//     cursor: pointer;
//     fill: red;
//   }
// `;
