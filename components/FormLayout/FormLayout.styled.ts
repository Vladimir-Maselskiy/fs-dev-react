import styled from 'styled-components';
import image from '../../img/window-shadow-overlay-6870363.png';

export const FormLayoutStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  padding-bottom: 80px;
  margin-top: 10px;
  margin-bottom: 80px;
  border: solid #2196f3 2px;
  border-radius: 10px;
  width: 100%;
  background-image: url(${image.src});
  background-color: transparent;
  background-size: 50% 100%;
  background-repeat: no-repeat;
`;
