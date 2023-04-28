import React, { useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Box } from '../Box/Box';
import { FieldData } from 'rc-field-form/lib/interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/state';
import { IUser } from '@/interfaces/interfaces';

export default function LoginPage() {
  const { setUser } = useUserContext();
  const [isEmailInputPassed, setIsEmailInputPassed] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, password } = values;
    try {
      const body = { email, password };
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_HOST}/users/addUser`, body)
        .then(res => {
          const newUser: IUser = res.data.user;
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          form.resetFields();
          router.push('/account/email/verify');
        });
    } catch (error) {
      console.log(error);
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

  return (
    <Box ml={50} mt={50}>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFieldsChange={onFieldsChange}
        // autoComplete=""
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
    </Box>
  );
}
