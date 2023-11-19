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
  margin-bottom: 0px;
  border: solid #2196f3 2px;
  border-radius: 10px;
  margin-top: 50px;
  min-height: 550px;
  width: 100%;
  background-image: url(${image.src});
  background-color: transparent;
  background-size: 50% 100%;
  background-repeat: no-repeat;
  z-index: 1;
`;

export const OverFlowWrapper = styled.div`
  overflow: hidden;
`;

export const StyledCanvasBox = styled.div`
  position: absolute;
  left: 32px;
  top: 80px;
  z-index: 1;
`;

export const StyledDoubleRightOutlined = styled(Button)`
  position: absolute;
  left: 0;
  top: 80px;
  height: 100px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  z-index: 2;
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
    pointer-events: none;
  }
`;
