import React from 'react';
import { StyledAuthFormBox } from './AuthFormBox.styled';

type TProps = {
  children: React.ReactNode;
};

export const AuthFormBox = ({ children }: TProps) => {
  return <StyledAuthFormBox>{children}</StyledAuthFormBox>;
};
