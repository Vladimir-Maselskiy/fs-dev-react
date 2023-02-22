import styled from 'styled-components';
import { Button } from 'antd';

export const StyledControlButton = styled(Button)`
  min-height: 50px;
  min-width: 40px;
  width: 40px;
  fill: ${p =>
    p.disabled
      ? 'var(--grey-color)'
      : 'var(--accent-color)'};
  cursor: ${p => (p.disabled ? 'auto' : 'pointer')};
  color: var(--accent-color);
  &:not(:first-child) {
    margin-top: 10px;
  }
`;
