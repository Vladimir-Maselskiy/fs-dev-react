import styled from 'styled-components';

export const StyledControlButton = styled.button`
  min-height: 50px;
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
