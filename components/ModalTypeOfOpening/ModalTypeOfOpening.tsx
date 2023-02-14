import React, { useState, useEffect } from 'react';
import { Select, Form } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { typeOfOpeningSelectOpions } from '@/const';
import {
  ALLTypeOfOpeningConst,
  IFSet,
  TTypeOfOpenimg,
} from '@/interfaces/interfaces';
import { isStringInUnionTypeOfOpening } from '@/utils/ts-utils/isStringInUnion';
import { getSetById } from '@/utils/getSetById';
import { useFSetsContext } from '@/context/state';

type TProps = {
  id: string;
  form: any;
};

export const ModalTypeOfOpening = ({
  id,
  form,
}: TProps) => {
  const { fSetsArray, setFSetsArray } = useFSetsContext();
  const [fSet, setFSet] = useState<IFSet | null>(null);
  const [typeOfOpening, setTypeOfOpening] =
    useState<TTypeOfOpenimg>('type-1');

  useEffect(() => {
    const originalfSet = getSetById(id, fSetsArray);
    if (originalfSet) {
      const fSet = { ...originalfSet };
      setFSet(fSet);
      setTypeOfOpening(fSet.typeOfOpening);
    }
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({ typeOfOpening });
    if (fSet) setFSet({ ...fSet, typeOfOpening });
  }, [typeOfOpening]);

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
      )
    )
      setTypeOfOpening(option.value);
  };
  return (
    <Form.Item
      label="Тип відкривання"
      name="typeOfOpening"
      style={{ paddingRight: 40 }}
    >
      <Select
        onChange={handleChange}
        options={typeOfOpeningSelectOpions}
        listHeight={150}
      />
    </Form.Item>
  );
};
