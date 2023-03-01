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
  const { fSetsArray } = useFSetsContext();

  useEffect(() => {
    form.setFieldsValue(fSet?.typeOfOpening);
  }, [fSet?.typeOfOpening, form]);

  // const handleChange = (
  //   e: CheckboxChangeEvent,
  //   option:
  //     | {
  //         value: string;
  //         label: string;
  //       }
  //     | {
  //         value: string;
  //         label: string;
  //       }[]
  // ) => {
  //   if (
  //     !Array.isArray(option) &&
  //     isStringInUnionTypeOfOpening(option.value, ALLTypeOfOpeningConst) &&
  //     fSet
  //   ) {
  //     setFSet({ ...fSet, typeOfOpening: option.value });
  //   }
  // };
  return (
    <Form.Item
      label="Тип відкривання"
      name="typeOfOpening"
      style={{ paddingRight: 40 }}
      initialValue={fSet?.typeOfOpening}
    >
      <Select
        // onChange={handleChange}
        options={typeOfOpeningSelectOpions}
        listHeight={170}
      />
    </Form.Item>
  );
};
