import styled from 'styled-components';
import { NextLink } from '../NextLink/NextLink';
import Link from 'next/link';

export const NextLinkStyledButton = styled(Link)`
  /* display: block; */
  font-weight: 400;
  font-size: 24px;
  /* line-height: 18px; */
  text-align: center;
  letter-spacing: -0.01em;
  color: #32abf2;
  padding: 10px 20px;
  border: 2px solid #32abf2;
  border-radius: 5px;
  background-color: var(--first-background-color);
  /* background-color: white; */
  transition: border-radius 0.25s;

  &:hover {
    border-radius: 30px;
  }
`;
