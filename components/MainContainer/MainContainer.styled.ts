import styled from 'styled-components';

export const StyledMainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
