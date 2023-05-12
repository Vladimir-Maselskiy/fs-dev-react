import styled from 'styled-components';
import image from '../../img/maco-key.png';

export const StyledAuthLayout = styled.div`
  display: flex;
  padding: 100px 50px 50px 30px;
  min-height: 580px;
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`;
export const StyledImageBox = styled.div`
  width: 100%;
  min-width: 320px;
  height: 100%;
  background-image: url(${image.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(-45deg);
  transform: rotate(-45deg);
`;
export const AuthImageContainer = styled.div`
  padding: 50px;
  /* width: 50%; */
  flex-grow: 2;
  background-color: var(--accent-color);
  border-radius: 30px;
  margin-left: 50px;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
