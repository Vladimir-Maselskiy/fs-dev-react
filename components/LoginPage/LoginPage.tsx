import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Spin } from 'antd';
import { Box } from '../Box/Box';
import { FieldData } from 'rc-field-form/lib/interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/state';
import { IUser } from '@/interfaces/interfaces';
import IconGoogleLogo from '../../img/google-icon.svg';
import { signIn, signOut, useSession } from 'next-auth/react';
import { createError } from '@/utils/mongo/createError';
import { AuthLayout } from '../AuthLayout/AuthLayout';
import { AuthFormBox } from '../AuthFormBox/AuthFormBox';

export default function LoginPage() {
  const { setUser } = useUserContext();
  const [isEmailInputPassed, setIsEmailInputPassed] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (session) {
  //     router.push('/');
  //   }
  // }, [session, router]);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    try {
      const body = { email, password };
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_HOST}/users/login`, body)
        .then(res => {
          const user: IUser = res.data;
          if (user) {
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            form.resetFields();
            router.push('/');
          } else {
            createError(500, 'Server error');
          }
        });
    } catch (error: any) {
      const message = error.response?.data?.error;
      const status = error.response?.status;
    }
  };

  const onFieldsChange = (
    changedFields: FieldData[],
    allFields: FieldData[]
  ) => {
    const field = changedFields[0];
    if (Array.isArray(field.name) && field.name[0] === 'email') {
      field.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
        ? setIsNextButtonDisabled(false)
        : setIsNextButtonDisabled(true);
    }
    if (Array.isArray(field.name) && field.name[0] === 'password') {
      field.value.length >= 4
        ? setIsSubmitButtonDisabled(false)
        : setIsSubmitButtonDisabled(true);
    }
  };

  const onNextButtonClick = () => {
    setIsEmailInputDisabled(true);
    setIsEmailInputPassed(true);
  };

  const onClickChangeEmailInput = (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault();
    setIsEmailInputDisabled(false);
    setIsEmailInputPassed(false);
  };

  const onGooleLoginButtonClick = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: '/' });
  };

  return isLoading ? (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spin size="large" />
    </Box>
  ) : (
    <AuthLayout>
      <AuthFormBox>
        <Form
          form={form}
          name="loginForm"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          layout="vertical"
          onFieldsChange={onFieldsChange}
          autoComplete="on"
        >
          <Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input disabled={isEmailInputDisabled} />
            </Form.Item>
            {isEmailInputDisabled && (
              <a
                href=""
                onClick={onClickChangeEmailInput}
                style={{ position: 'absolute', top: '35px', right: '10px' }}
              >
                Change
              </a>
            )}
          </Form.Item>
          {!isEmailInputPassed && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                style={{ width: 90 }}
                disabled={isNextButtonDisabled}
                onClick={onNextButtonClick}
              >
                Next
              </Button>
            </Form.Item>
          )}

          {isEmailInputPassed && (
            <>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 90 }}
                  disabled={isSubmitButtonDisabled}
                >
                  Login
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
        <Divider />
        <p>Sing with Google</p>
        <Button
          icon={<IconGoogleLogo />}
          onClick={onGooleLoginButtonClick}
          style={{
            width: 120,
            marginTop: 20,
            padding: '20px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Google
        </Button>
      </AuthFormBox>
    </AuthLayout>
  );
}
