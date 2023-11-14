import { IFSet } from '@/interfaces/interfaces';
import { List } from 'antd';
import styled from 'styled-components';

type TProps = {
  open: boolean;
  fset: IFSet;
};

export const StyledCanvasFElementsList = styled(List)<TProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
  background-color: palegoldenrod;
  transition: transform 0.8s ease-in-out;
  overflow: ${props => (props.open ? 'auto' : 'hidden')};
  z-index: ${props =>
    Math.max(
      props.fset.optionalVerticalLock?.length || 0,
      props.fset.optionalGorizontalLock?.length || 0
    ) + 1};
`;
export const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  & p {
    padding: 10px;
  }
`;
