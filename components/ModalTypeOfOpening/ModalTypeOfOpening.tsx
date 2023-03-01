import React, { useState, useEffect } from 'react';
import { Select, Form } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { typeOfOpeningSelectOpions } from '@/const';
import { ALLTypeOfOpeningConst, IFSet } from '@/interfaces/interfaces';
import { isStringInUnionTypeOfOpening } from '@/utils/ts-utils/isStringInUnion';
import { getSetById } from '@/utils/ui-utills/getSetById';
import { useFSetsContext } from '@/context/state';

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
