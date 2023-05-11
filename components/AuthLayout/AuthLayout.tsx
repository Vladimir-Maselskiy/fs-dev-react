import React from 'react';
import { Box } from '../Box/Box';
import { StyledImageBox } from './AuthLayout.styled';

type TProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: TProps) => {
  return (
    <Box display="flex">
      {children}
      <StyledImageBox></StyledImageBox>
    </Box>
  );
};
