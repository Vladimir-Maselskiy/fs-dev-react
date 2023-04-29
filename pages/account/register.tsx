import React from 'react';

import { MainContainer } from '@/components/MainContainer/MainContainer';
import LoginPage from '@/components/LoginPage/LoginPage';
import RegisterPage from '@/components/RegisterPage/RegisterPage';

export default function Login() {
  return (
    <MainContainer>
      <RegisterPage />
    </MainContainer>
  );
}
