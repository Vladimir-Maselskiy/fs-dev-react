import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 24px;
`;

export const StyledInput = styled.input`
  width: 90px;
  text-align: center;
  font-size: 32px;
  -moz-appearance: textfield;
  color: #2196f3;
  border-radius: 4px;
  font-weight: 700;
  border: 2px solid var(--grey-color);
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
