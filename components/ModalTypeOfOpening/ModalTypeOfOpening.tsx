import React, { useState, useEffect } from 'react';
import { Select, Form } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { typeOfOpeningSelectOpions } from '@/const';
import { ALLTypeOfOpeningConst } from '@/interfaces/interfaces';
import { isStringInUnionTypeOfOpening } from '@/utils/ts-utils/isStringInUnion';
import { getSetById } from '@/utils/getSetById';
import { useFSetsContext } from '@/context/state';
import { getOneOptionTypeOfOpening } from '@/utils/getOneOptionTypeOfOpening';

type TProps = {
  id: string;
  form: any;
};

export const ModalTypeOfOpening = ({
  id,
  form,
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState(
    getSetById(id, fSetsArray)
  );

  useEffect(() => {
    setFSet(getSetById(id, fSetsArray));
  }, [id]);

  useEffect(() => {
    form.setFieldsValue(fSet?.typeOfOpening);
  }, [fSet?.typeOfOpening]);

  const handleChange = (
    e: CheckboxChangeEvent,
    option:
      | {
          value: string;
          label: string;
        }
      | {
          value: string;
          label: string;
        }[]
  ) => {
    if (
      !Array.isArray(option) &&
      isStringInUnionTypeOfOpening(
        option.value,
        ALLTypeOfOpeningConst
      ) &&
      fSet
    ) {
      setFSet({ ...fSet, typeOfOpening: option.value });
    }
  };
  return (
    <Form.Item
      label="Тип відкривання"
      name="typeOfOpening"
      style={{ paddingRight: 40 }}
      initialValue={fSet?.typeOfOpening}
    >
      <Select
        onChange={handleChange}
        options={typeOfOpeningSelectOpions}
        listHeight={170}
      />
    </Form.Item>
  );
};
