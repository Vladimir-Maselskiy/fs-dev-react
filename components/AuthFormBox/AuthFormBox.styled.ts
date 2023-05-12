import styled from 'styled-components';
import image from '../../img/maco-key.png';

export const StyledAuthFormBox = styled.div`
  width: 40%;
  padding: 30px 50px;
  border: 2px solid var(--accent-color);
  border-radius: 30px;

  @media screen and (max-width: 1024px) {
    width: 80%;
    min-width: 300px;
  }
`;
