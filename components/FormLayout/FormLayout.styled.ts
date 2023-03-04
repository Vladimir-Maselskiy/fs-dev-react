import { Button } from 'antd';
import styled from 'styled-components';
import image from '../../img/window-shadow-overlay-6870363.png';

export const FormLayoutStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px 40px 15px;
  margin-top: 10px;
  margin-bottom: 0px;
  border: solid #2196f3 2px;
  border-radius: 10px;
  width: 100%;
  background-image: url(${image.src});
  background-color: transparent;
  background-size: 50% 100%;
  background-repeat: no-repeat;
  z-index: 1;
`;

export const ButtonStyled = styled(Button)`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 15px;
  border: 2px solid var(--accent-color);
  width: 100%;
  height: 80px;
  margin-top: 2px;
  &::before {
    content: '';
    position: absolute;
    top: 0px;
    z-index: 10;
    width: 206px;
    height: 35px;
    background-color: transparent;
    border: 2px solid var(--accent-color);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top: none;
    border-color: ${p => (p.disabled ? '#a3d4ff' : 'var(--accent-color)')};
  }
`;
