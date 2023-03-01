import React, { useEffect } from 'react';
import { Select, Form } from 'antd';
import { typeOfOpeningSelectOpions } from '@/const';
import { IFSet } from '@/interfaces/interfaces';

type TProps = {
  fSet: IFSet;
  form: any;
};

export const ModalTypeOfOpening = ({ fSet, form }: TProps) => {
  useEffect(() => {
    form.setFieldsValue(fSet?.typeOfOpening);
  }, [fSet?.typeOfOpening, form]);

  return (
    <Form.Item
      label="Тип відкривання"
      name="typeOfOpening"
      style={{ paddingRight: 40 }}
      initialValue={fSet?.typeOfOpening}
    >
      <Select options={typeOfOpeningSelectOpions} listHeight={170} />
    </Form.Item>
  );
};
