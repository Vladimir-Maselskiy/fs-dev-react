import React, { useState, useEffect } from 'react';

import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { Box } from '../Box/Box';
import { useFSetsContext } from '@/context/state';
import { getSetById } from '@/utils/ui-utills/getSetById';
import { height } from 'styled-system';

export const TestComonent = () => {
  const { fSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState(getSetById('1', fSetsArray));
  useEffect(() => {
    setFSet(getSetById('1', fSetsArray));
  }, [fSetsArray]);

  const onClick = () => {
    if (fSet)
      if (fSet?.height !== 0 && !fSet?.height) {
        setFSet({ ...fSet, height: 0 });
      } else {
        setFSet({ ...fSet, height: fSet.height + 1 });
      }
  };
  return (
    // <Form
    //   name="basic"
    //   labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
    //   style={{ maxWidth: 600 }}
    //   initialValues={{ remember: true }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    // >
    <Box>
      <p>Test Form</p>
      {/* <Form.Item
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
    </Form.Item> */}
      {/* label="Висота до ручки"
        name="hanleDistance"
      > */}
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

      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}> */}
      <Button type="primary" onClick={onClick}>
        Submit
      </Button>
    </Box>

    // </Form>
  );
};
