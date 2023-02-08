import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid var(--accent-color);
  border-radius: 25%;
  cursor: pointer;
`;

export const StyledSetsCounter = styled.input`
  width: 60px;
  text-align: center;
  font-size: 36px;
  -moz-appearance: textfield;
  color: #2196f3;
  border-radius: 4px;
  font-weight: 700;
  border: 1px solid var(--grey-color);
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
