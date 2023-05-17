import React from 'react';
import { Box } from '../Box/Box';
import Image from 'next/image';
import IconMacoLogo from '../../img/maco-logo.svg';
import {
  StyledImage,
  StyledImageContainer,
  StyledNavContent,
} from './NavContent.styled';
import Link from 'next/link';

export const NavContent = () => {
  return (
    <StyledNavContent>
      <Link
        href={{
          pathname: '/input-form',
          query: { brand: 'maco' },
        }}
      >
        <StyledImageContainer>
          <StyledImage src="/maco-logo.svg" alt="maco-logo" />
        </StyledImageContainer>
      </Link>
      <Link
        href={{
          pathname: '/input-form',
          query: { brand: 'vorne' },
        }}
      >
        <StyledImageContainer>
          <StyledImage src="/vorne-logo.svg" alt="maco-logo" />
        </StyledImageContainer>
      </Link>
    </StyledNavContent>
  );
};
