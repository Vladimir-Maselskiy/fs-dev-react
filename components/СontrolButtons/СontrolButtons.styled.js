import styled from 'styled-components';

export const StyledControlButton = styled.button`
  fill: ${p =>
    p.disabled
      ? 'var(--grey-color)'
      : 'var(--accent-color)'};
  cursor: ${p => (p.disabled ? 'auto' : 'pointer')};
  &:not(:first-child) {
    margin-top: 10px;
  }
`;
