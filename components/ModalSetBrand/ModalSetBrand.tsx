import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

type TProps = {
  id: string;
  form: any;
};

export const ModalSetBrand = ({ id, form }: TProps) => {
  const onFinish = (e: any) => {
    e.preventDefault();
    console.log(e);
  };
  return <></>;
};
