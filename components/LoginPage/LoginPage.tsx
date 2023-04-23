import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Box } from '../Box/Box';
import { FieldData } from 'rc-field-form/lib/interface';

export default function LoginPage() {
  const [isEmailInputPassed, setIsEmailInputPassed] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const onFieldsChange = (
    changedFields: FieldData[],
    allFields: FieldData[]
  ) => {
    console.log('dasda');
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
    // console.log('changedFields', email);
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
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFieldsChange={onFieldsChange}
        autoComplete="off"
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
