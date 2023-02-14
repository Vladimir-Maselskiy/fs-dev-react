import React from 'react';
import { Select, Form } from 'antd';
import { typeOfOpeningSelectOpions } from '@/const';

type TProps = {
  id: string;
  form: any;
};

export const ModalTypeOfOpening = ({
  id,
  form,
}: TProps) => {
  return (
    <Form.Item label="Тип відкривання" name="typeOfOpening">
      <Select
        defaultValue={typeOfOpeningSelectOpions[0]}
        style={{ width: 200 }}
        //   onChange={handleChange}
        options={typeOfOpeningSelectOpions}
        listHeight={150}
      />
    </Form.Item>
  );
};
