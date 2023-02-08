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
