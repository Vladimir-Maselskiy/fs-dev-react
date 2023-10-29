import styled from 'styled-components';
import Icon211924WR from '../../../../public/articlesSVG/211924w-r.svg';

export const StyledCanvasGorizontalLock = styled.div`
  position: absolute;
  top: calc(70% + 50px);
  left: calc(30% - 60px);
  width: 35%;
`;
export const StyledIcon211924W = styled(Icon211924WR)`
  &:hover {
    cursor: pointer;
    fill: red;
  }
`;
