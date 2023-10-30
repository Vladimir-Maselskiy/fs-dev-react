import styled from 'styled-components';
import Icon211924WR from '../../../../public/articlesSVG/211924h-r.svg';

export const StyledCanvasVerticalLock = styled.div`
  position: absolute;
  top: calc(20px);
  left: calc(70% + 20px);
  height: 35%;
`;
export const StyledIcon211924W = styled(Icon211924WR)`
  &:hover {
    cursor: pointer;
    fill: red;
  }
`;
