import { IFSet } from '@/interfaces/interfaces';
import { List } from 'antd';
import styled from 'styled-components';

type TProps = {
  open: boolean;
  fset: IFSet;
};

export const StyledCanvasFElementsList = styled(List)<TProps>`
  position: absolute;
  top: 5px;
  left: 5px;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  border: 2px solid #806d3c;
  border-radius: 6px;
  transform: ${props =>
    props.open ? 'translateX(0)' : 'translateX(calc(-100% - 5px))'};
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
