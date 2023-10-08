import styled from 'styled-components';
import Link from 'next/link';

export const NextLinkStyledButton = styled(Link)`
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #32abf2;
  padding: 2px 10px;
  border: 2px solid #32abf2;
  border-radius: 5px;
  background-color: var(--first-background-color);
  transition: border-radius 0.25s;

  &:hover {
    border-radius: 30px;
  }
`;
