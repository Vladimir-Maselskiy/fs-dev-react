import styled from 'styled-components';
import image from '../../img/maco-key.png';

export const StyledImageBox = styled.div`
  width: 100%;
  min-width: 320px;
  height: 100%;
  background-image: url(${image.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
`;
export const AuthImageContainer = styled.div`
  padding: 50px;
  /* width: 50%; */
  flex-grow: 2;
  background-color: var(--accent-color);
  border-radius: 30px;
  margin-left: 50px;
`;
