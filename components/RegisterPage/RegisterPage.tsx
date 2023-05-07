import React, { useRef, useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Box } from '../Box/Box';
import { FieldData } from 'rc-field-form/lib/interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/state';
import { IUser } from '@/interfaces/interfaces';

export default function RegisterPage() {
  const { setUser } = useUserContext();
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (isNameValid && isEmailValid && isPasswordValid) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }, [isNameValid, isEmailValid, isPasswordValid]);

  const onFinish = async (values: any) => {
    try {
      const body = values;
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_HOST}/users/addUser`, body)
        .then(res => {
          const newUser: IUser = res.data.user;
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          form.resetFields();
          router.push('/account/email/verify');
        });
    } catch (error: any) {
      const message = error.response.data.error;
      const { status } = error.response;
      if (status === 422) {
        setIsErrorEmail(true);
      }
    }
  };

  const onFieldsChange = (
    changedFields: FieldData[],
    allFields: FieldData[]
  ) => {
    const field = changedFields[0];

    if (Array.isArray(field.name) && field.name[0] === 'name') {
      field.value.length >= 2 ? setIsNameValid(true) : setIsNameValid(false);
    }
    if (Array.isArray(field.name) && field.name[0] === 'email') {
      field.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
        ? setIsEmailValid(true)
        : setIsEmailValid(false);
      setIsErrorEmail(false);
    }
    if (Array.isArray(field.name) && field.name[0] === 'password') {
      field.value.length >= 4
        ? setIsPasswordValid(true)
        : setIsPasswordValid(false);
    }
  };

  return (
    <Box ml={50} mt={50}>
      <p>Sign up</p>
      <Form
        form={form}
        name="regiterForm"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFieldsChange={onFieldsChange}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          validateStatus={isErrorEmail ? 'error' : ''}
          help={isErrorEmail ? 'Email already used' : ''}
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
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
              Ok
            </Button>
          </Form.Item>
        </>
      </Form>
    </Box>
  );
}
