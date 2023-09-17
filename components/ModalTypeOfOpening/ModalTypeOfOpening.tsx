import React, { useEffect } from 'react';
import { Select, Form } from 'antd';
import { typeOfOpeningSelectOpions } from '@/const';
import { IFSet } from '@/interfaces/interfaces';
import { getOneOptionTypeOfOpening } from '@/utils/ui-utills/getOneOptionTypeOfOpening';

type TProps = {
  fSet: IFSet;
  form: any;
};

export const ModalTypeOfOpening = ({ fSet, form }: TProps) => {
  return (
    <Form.Item
      label="Тип відкривання"
      name="typeOfOpening"
      style={{ paddingRight: 40 }}
      initialValue={getOneOptionTypeOfOpening(fSet)}
    >
      <Select options={typeOfOpeningSelectOpions} listHeight={170} />
    </Form.Item>
  );
};
