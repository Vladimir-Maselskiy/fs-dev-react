import styled from 'styled-components';
import image from '../../img/window-shadow-overlay-6870363.png';

export const StyledFSetItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: solid #2196f3 2px;
  border-radius: 10px;
  width: 100%;
  background-image: url(${image.src});
  background-color: transparent;
  background-size: 50% 100%;
  background-repeat: no-repeat;
`;

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
