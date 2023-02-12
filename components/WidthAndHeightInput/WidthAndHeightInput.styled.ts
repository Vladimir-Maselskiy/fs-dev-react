import styled from 'styled-components';
import { borderStyle } from 'styled-system';

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 24px;
`;

export const StyledInput = styled.input<{
  borderStyle: 'initial' | 'valid' | 'invalid';
}>`
  width: 90px;
  text-align: center;
  font-size: 32px;
  -moz-appearance: textfield;
  color: #2196f3;
  border-radius: 4px;
  font-weight: 700;
  border: ${p => {
    switch (p.borderStyle) {
      case 'initial':
        return '2px solid var(--grey-color)';
      case 'invalid':
        return '2px solid red';
      case 'valid':
        return '2px solid var(--accent-color)';
    }
  }};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
