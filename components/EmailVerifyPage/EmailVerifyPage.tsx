import React, { useEffect } from 'react';
import { Box } from '../Box/Box';
import Image from 'next/image';
import { useUserContext } from '@/context/state';
import axios from 'axios';
import { useRouter } from 'next/router';

export const EmailVerifyPage = () => {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/account/login');
    }
  }, []);

  const onResendLinkClick = () => {
    const body = user;
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_HOST}/users/activate/resendActivationLink`,
        body
      )
      .then(res => console.log(res.data));
  };
  return (
    <Box padding={100} display="flex" flexDirection="column" width="50%">
      <p style={{ margin: '0 auto' }}>Чудово, підтвердіть Ваш email</p>
      <Image
        width={100}
        height={100}
        src="/email-verification-icon.svg"
        alt="email-verification-validation"
        style={{ margin: '10px auto 0' }}
      />
      <p style={{ marginTop: 10 }}>
        {`Перевірте свою поштову скриньку ${user?.email}  і натисніть посилання
        підтвердження всередині, щоб завершити реєстрацію. Термін дії цього
        посилання незабаром закінчиться, тому перевірте!`}
      </p>
      <p style={{ marginTop: 10 }}>
        <b> Не бачите листа? </b>Перевірте папку спам
      </p>
      <div style={{ marginTop: 10 }}>
        <b> Вийшов строк дії посилання? </b>
        <span
          onClick={onResendLinkClick}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          Надіслати повторно
        </span>
      </div>
    </Box>
  );
};
