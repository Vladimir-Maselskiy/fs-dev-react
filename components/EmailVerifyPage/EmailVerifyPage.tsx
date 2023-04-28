import React from 'react';
import { Box } from '../Box/Box';
import Image from 'next/image';
import { useUserContext } from '@/context/state';
import axios from 'axios';

export const EmailVerifyPage = () => {
  const { user } = useUserContext();

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
    <Box
      padding={100}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="50%"
    >
      <p>Чудово, підтвердіть Ваш email</p>
      <Image
        width={100}
        height={100}
        src="/email-verification-icon.svg"
        alt="email-verification-validation"
        style={{ marginTop: 10 }}
      />
      <p style={{ marginTop: 10 }}>
        {`Перевірте свою поштову скриньку ${user?.email}  і натисніть посилання
        підтвердження всередині, щоб завершити реєстрацію. Термін дії цього
        посилання незабаром закінчиться, тому перевірте!`}
      </p>
      <p>
        <b> Не бачите листа? </b>Перевірте папку спам
      </p>
      <div>
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
