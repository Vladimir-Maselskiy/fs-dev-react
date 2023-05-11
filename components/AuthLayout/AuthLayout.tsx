import React from 'react';
import { Box } from '../Box/Box';
import { AuthImageContainer, StyledImageBox } from './AuthLayout.styled';

type TProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: TProps) => {
  return (
    <Box display="flex" padding="100px 50px 50px 30px">
      {children}
      <AuthImageContainer>
        <StyledImageBox></StyledImageBox>
      </AuthImageContainer>
    </Box>
  );
};
