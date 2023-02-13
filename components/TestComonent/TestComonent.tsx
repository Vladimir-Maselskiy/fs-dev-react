import React from 'react';

import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
} from 'antd';
import { Box } from '../Box/Box';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export const TestComonent = () => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Box>
        <p>Test Form</p>
      </Box>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Remember me"
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        label="Висота до ручки"
        name="hanleDistance"
      >
        {/* <span>Висота до ручкииииииииииЖ</span> */}
        <InputNumber
          min={235}
          max={1065}
          style={{
            width: '70px',
            marginLeft: '10px',
          }}
          placeholder="650"
        />
      </Form.Item>

      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}> */}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      {/* </Form.Item> */}
    </Form>
  );
};
