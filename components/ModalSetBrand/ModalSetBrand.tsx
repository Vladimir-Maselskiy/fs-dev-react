import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

type TProps = {
  id: string;
};

export const ModalSetBrand = ({ id }: TProps) => {
  const onFinish = (e: any) => {
    e.preventDefault();
    console.log(e);
  };
  return <></>;
};
