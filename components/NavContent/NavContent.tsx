import React from 'react';
import {
  StyledImage,
  StyledImageContainer,
  StyledNavContent,
} from './NavContent.styled';
import Link from 'next/link';
import { useUserContext } from '@/context/state';

export const NavContent = () => {
  const { user } = useUserContext();

  return (
    <StyledNavContent>
      <Link
        href={{
          pathname: 'furniture/input-form',
          query: { brand: 'maco' },
        }}
      >
        <StyledImageContainer>
          <StyledImage src="/maco-logo.svg" alt="maco-logo" />
        </StyledImageContainer>
      </Link>
      <Link
        href={{
          pathname: 'furniture/input-form',
          query: { brand: 'vorne' },
        }}
      >
        <StyledImageContainer>
          <StyledImage src="/vorne-logo.svg" alt="vorne-logo" />
        </StyledImageContainer>
      </Link>
      <Link
        href={{
          pathname: '/lamination',
        }}
      >
        {user?.status === 'admin' && (
          <StyledImageContainer>
            <StyledImage src="/laminates-foto.png" alt="lamanates-foto" />
          </StyledImageContainer>
        )}
      </Link>
    </StyledNavContent>
  );
};
