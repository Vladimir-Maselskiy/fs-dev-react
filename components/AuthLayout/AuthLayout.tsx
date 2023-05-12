import React from 'react';
import {
  AuthImageContainer,
  StyledAuthLayout,
  StyledImageBox,
} from './AuthLayout.styled';

type TProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: TProps) => {
  return (
    <StyledAuthLayout>
      {children}
      <AuthImageContainer>
        <StyledImageBox></StyledImageBox>
      </AuthImageContainer>
    </StyledAuthLayout>
  );
};
