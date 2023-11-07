import { List } from 'antd';
import styled from 'styled-components';

type TProps = {
  open: boolean;
  side?: 'right' | 'left';
  iconWidth?: string;
  outterPadding?: number;
};

export const StyledCanvasFElementsList = styled(List)<TProps>`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
  background-color: palegoldenrod;
  transition: transform 0.8s ease-in-out;
`;
export const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  & p {
    padding: 10px;
  }
`;