import React from 'react';

import { MainContainer } from '@/components/MainContainer/MainContainer';
import { EmailVerifyPage } from '@/components/EmailVerifyPage/EmailVerifyPage';

export default function Login() {
  return (
    <MainContainer>
      <EmailVerifyPage />
    </MainContainer>
  );
}
