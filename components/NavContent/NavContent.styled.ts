import styled from 'styled-components';

export const StyledNavContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 20px;
`;
export const StyledImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 160px);
  padding: 20px;
  border: 2px solid var(--accent-color);
  border-radius: 30px;
  @media screen and (max-width: 380px) {
    height: calc(100vw - 50px);
  }
`;
export const StyledImage = styled.img`
  aspect-ratio: 1/1;
  position: absolute;
  height: 80%;
  animation-name: scaleAnimation;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;
