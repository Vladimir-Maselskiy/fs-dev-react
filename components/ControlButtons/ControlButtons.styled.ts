import styled from 'styled-components';
import { Button } from 'antd';

export const StyledContlolButtonBox = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  padding: 1px;
  background-color: var(--first-background-color);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    transform: translate(-3px, -2px);
    height: calc(50% + 1px);
    border: 2px solid var(--accent-color);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: none;
  }
`;

export const StyledControlButton = styled(Button)`
  min-height: 75px;
  min-width: 100px;
  width: 100px;
  fill: ${p => (p.disabled ? 'var(--grey-color)' : 'var(--accent-color)')};
  cursor: ${p => (p.disabled ? 'auto' : 'pointer')};
  color: var(--accent-color);
  border-radius: 0;
  &:first-child {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  &:last-child {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
`;
