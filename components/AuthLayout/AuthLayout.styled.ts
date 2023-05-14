import styled from 'styled-components';

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
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(-45deg);
  transform: rotate(-45deg);
  transform: translateX(100px);
`;
export const SwiperContainer = styled.div`
  /* padding: 50px; */
  max-width: 700px;
  flex-grow: 2;
  /* background-color: var(--accent-color); */
  border-radius: 30px;
  margin-left: 50px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
